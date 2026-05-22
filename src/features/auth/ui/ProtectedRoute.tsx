import type { FC, ReactNode } from "react"
import { useAuthContext } from "./AuthProvider"
import { Navigate } from "react-router"

interface Props {
  element: ReactNode
}

const ProtectedRoute: FC<Props> = ({ element }) => {
  const { isAuth } = useAuthContext()

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return element
}

export default ProtectedRoute
