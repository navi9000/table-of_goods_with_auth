import { use } from "react"
import { AuthContext } from "./auth-context"

export const useAuthContext = () => {
  const context = use(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be under AuthContentProvider")
  }

  return context
}
