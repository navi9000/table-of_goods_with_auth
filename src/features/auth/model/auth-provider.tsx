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

const tokenStorageKey = "goods-table-auth-session"
const refreshMarginMs = 30_000
const accessTokenLifetimeMs = 15 * 60_000

type StoredSession = TokenPair

const getStoredSession = (): StoredSession | null => {
  try {
    const storedValue = localStorage.getItem(tokenStorageKey)
    if (!storedValue) {
      return null
    }

    const session = JSON.parse(storedValue) as Partial<StoredSession>
    if (
      typeof session.accessToken !== "string" ||
      typeof session.refreshToken !== "string" ||
      !session.accessToken ||
      !session.refreshToken
    ) {
      return null
    }

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    }
  } catch {
    return null
  }
}

const getAccessTokenExpiration = (accessToken: string) => {
  try {
    const payload = accessToken.split(".")[1]
    const { exp } = JSON.parse(atob(payload)) as { exp?: number }
    return typeof exp === "number" ? exp * 1000 : null
  } catch {
    return null
  }
}

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storedSession] = useState<StoredSession | null>(getStoredSession)
  const [tokens, setTokens] = useState<TokenPair | null>(storedSession)
  const [remember, setRemember] = useState(Boolean(storedSession))
  const [isInitializing, setIsInitializing] = useState(Boolean(storedSession))
  const refreshInFlight = useRef<Promise<TokenPair> | null>(null)

  const clearStoredSession = useCallback(() => {
    try {
      localStorage.removeItem(tokenStorageKey)
    } catch {
      return
    }
  }, [])

  const storeSession = useCallback((nextTokens: TokenPair) => {
    try {
      localStorage.setItem(tokenStorageKey, JSON.stringify(nextTokens))
    } catch {
      return
    }
  }, [])

  const logout = useCallback(() => {
    setTokens(null)
    setRemember(false)
    setIsInitializing(false)
    clearStoredSession()
  }, [clearStoredSession])

  const refresh = useCallback(
    async (refreshToken: string) => {
      if (!refreshInFlight.current) {
        refreshInFlight.current = refreshTokenRequest(refreshToken).finally(
          () => {
            refreshInFlight.current = null
          },
        )
      }

      try {
        return await refreshInFlight.current
      } catch {
        logout()
        throw new Error("Unable to refresh authentication session")
      }
    },
    [logout],
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
