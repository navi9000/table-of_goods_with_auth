import { useNavigate } from "react-router"

export function useGoBack() {
  const navigate = useNavigate()

  return () => navigate("/")
}
