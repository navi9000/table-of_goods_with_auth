import { createContext } from "react"

export type Token = string | null

export type TokenPair = {
  accessToken: string
  refreshToken: string
}

export type AuthContextParams = {
  token: Token
  refreshToken: Token
  authenticate: (tokens: TokenPair, remember: boolean) => void
  logout: () => void
  isAuth: boolean
  isInitializing: boolean
}

export const AuthContext = createContext<AuthContextParams | null>(null)
