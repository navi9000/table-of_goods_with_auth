import {
  createContext,
  use,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react"

type Token = string | null

type AuthContextParams = {
  token: Token
  setToken: Dispatch<SetStateAction<Token>>
  isAuth: boolean
}

const AuthContext = createContext<AuthContextParams | null>(null)

const useAuthContext = () => {
  const context = use(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be under AuthContentProvider")
  }

  return context
}

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<Token>(null)

  const value: AuthContextParams = {
    token,
    setToken,
    isAuth: token !== null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, useAuthContext }
