import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react"
import {
  AuthContext,
  type AuthContextParams,
  type TokenPair,
} from "./auth-context"
import { refreshTokenRequest } from "../api/refreshToken"
import {
  createAuthSessionStorage,
  getAccessTokenExpiration,
  type AuthSessionStorage,
} from "./auth-session"

const refreshMarginMs = 30_000
const accessTokenLifetimeMs = 15 * 60_000

type StoredSession = TokenPair

export interface AuthProviderProps {
  sessionStorage?: AuthSessionStorage
  refreshRequest?: typeof refreshTokenRequest
}

const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
  sessionStorage: providedSessionStorage,
  refreshRequest = refreshTokenRequest,
}) => {
  const [sessionStorage] = useState(
    () => providedSessionStorage ?? createAuthSessionStorage(),
  )
  const [storedSession] = useState<StoredSession | null>(sessionStorage.read)
  const [tokens, setTokens] = useState<TokenPair | null>(storedSession)
  const [remember, setRemember] = useState(Boolean(storedSession))
  const [isInitializing, setIsInitializing] = useState(Boolean(storedSession))
  const refreshInFlight = useRef<Promise<TokenPair> | null>(null)

  const clearStoredSession = useCallback(() => {
    sessionStorage.clear()
  }, [sessionStorage])

  const storeSession = useCallback(
    (nextTokens: TokenPair) => {
      sessionStorage.write(nextTokens)
    },
    [sessionStorage],
  )

  const logout = useCallback(() => {
    setTokens(null)
    setRemember(false)
    setIsInitializing(false)
    clearStoredSession()
  }, [clearStoredSession])

  const refresh = useCallback(
    async (refreshToken: string) => {
      if (!refreshInFlight.current) {
        refreshInFlight.current = refreshRequest(refreshToken).finally(() => {
          refreshInFlight.current = null
        })
      }

      try {
        return await refreshInFlight.current
      } catch {
        logout()
        throw new Error("Unable to refresh authentication session")
      }
    },
    [logout, refreshRequest],
  )

  const authenticate = useCallback(
    (nextTokens: TokenPair, shouldRemember: boolean) => {
      setTokens(nextTokens)
      setRemember(shouldRemember)
      setIsInitializing(false)

      if (shouldRemember) {
        storeSession(nextTokens)
      } else {
        clearStoredSession()
      }
    },
    [clearStoredSession, storeSession],
  )

  useEffect(() => {
    if (!storedSession) {
      return
    }

    const startupRefreshTimer = window.setTimeout(() => {
      void refresh(storedSession.refreshToken)
        .then((nextTokens) => {
          setTokens(nextTokens)
          storeSession(nextTokens)
        })
        .catch(() => undefined)
        .finally(() => setIsInitializing(false))
    }, 0)

    return () => window.clearTimeout(startupRefreshTimer)
  }, [refresh, storedSession, storeSession])

  useEffect(() => {
    if (!tokens) {
      return
    }

    const expiration = getAccessTokenExpiration(tokens.accessToken)
    const delay = expiration
      ? Math.max(expiration - Date.now() - refreshMarginMs, 0)
      : accessTokenLifetimeMs - refreshMarginMs
    const timer = window.setTimeout(() => {
      void refresh(tokens.refreshToken).then((nextTokens) => {
        setTokens(nextTokens)
        if (remember) {
          storeSession(nextTokens)
        }
      })
    }, delay)

    return () => window.clearTimeout(timer)
  }, [remember, refresh, storeSession, tokens])

  const value: AuthContextParams = {
    token: tokens?.accessToken ?? null,
    refreshToken: tokens?.refreshToken ?? null,
    authenticate,
    logout,
    isAuth: tokens !== null,
    isInitializing,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
