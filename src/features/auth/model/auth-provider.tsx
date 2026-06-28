import { useState, type FC, type PropsWithChildren } from "react"
import { AuthContext, type AuthContextParams, type Token } from "./auth-context"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<Token>(null)

  const value: AuthContextParams = {
    token,
    setToken,
    isAuth: token !== null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
