import { createBrowserRouter, RouterProvider } from "react-router"
import { TablePage } from "@/pages/table"
import { loginAction, LoginPage } from "@/pages/login"
import { NotFoundPage } from "@/pages/not-found"
import type { FC } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <TablePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
