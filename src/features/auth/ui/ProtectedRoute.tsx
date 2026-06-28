import type { FC, ReactNode } from "react"
import { Navigate } from "react-router"
import { useAuthContext } from "../model/use-auth-context"

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
