import type { TokenPair } from "./auth-context"

export const tokenStorageKey = "goods-table-auth-session"

export interface AuthSessionStorage {
  read: () => TokenPair | null
  write: (tokens: TokenPair) => void
  clear: () => void
}

const isTokenPair = (value: unknown): value is TokenPair => {
  if (!value || typeof value !== "object") {
    return false
  }

  const session = value as Partial<TokenPair>
  return Boolean(session.accessToken && session.refreshToken)
}

export const createAuthSessionStorage = (
  storage: Pick<Storage, "getItem" | "setItem" | "removeItem"> = localStorage,
): AuthSessionStorage => ({
  read: () => {
    try {
      const storedValue = storage.getItem(tokenStorageKey)
      if (!storedValue) {
        return null
      }

      const session: unknown = JSON.parse(storedValue)
      return isTokenPair(session) ? session : null
    } catch {
      return null
    }
  },
  write: (tokens) => {
    try {
      storage.setItem(tokenStorageKey, JSON.stringify(tokens))
    } catch {
      return
    }
  },
  clear: () => {
    try {
      storage.removeItem(tokenStorageKey)
    } catch {
      return
    }
  },
})

export const getAccessTokenExpiration = (accessToken: string) => {
  try {
    const payload = accessToken.split(".")[1]
    const { exp } = JSON.parse(atob(payload)) as { exp?: number }
    return typeof exp === "number" ? exp * 1000 : null
  } catch {
    return null
  }
}
