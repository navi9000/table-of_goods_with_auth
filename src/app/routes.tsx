import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import { TablePage } from "@/pages/table"
import { LoginPage } from "@/pages/login"
import type { FC } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <TablePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

const Routes: FC = () => {
  return <RouterProvider router={router} />
}

export default Routes
