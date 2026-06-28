import { createContext, type Dispatch, type SetStateAction } from "react"

export type Token = string | null

export type AuthContextParams = {
  token: Token
  setToken: Dispatch<SetStateAction<Token>>
  isAuth: boolean
}

export const AuthContext = createContext<AuthContextParams | null>(null)
