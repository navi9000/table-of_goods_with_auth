import { createBrowserRouter, RouterProvider } from "react-router"
import { listLoader, TablePage } from "@/pages/table"
import { loginAction, LoginPage } from "@/pages/login"
import { NotFoundPage } from "@/pages/not-found"
import type { FC } from "react"
import { ProtectedRoute, PublicRoute } from "@/features/auth"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<TablePage />} />,
    loader: listLoader,
  },
  {
    path: "/login",
    element: <PublicRoute element={<LoginPage />} />,
    action: loginAction,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

const Routes: FC = () => {
  return <RouterProvider router={router} />
}

export default Routes
