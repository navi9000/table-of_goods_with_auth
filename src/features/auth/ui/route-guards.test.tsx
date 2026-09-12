import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, it } from "vitest"
import { AuthContext, type AuthContextParams } from "../model/auth-context"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

const createAuthValue = (
  overrides: Partial<AuthContextParams> = {},
): AuthContextParams => ({
  token: null,
  refreshToken: null,
  authenticate: () => undefined,
  logout: () => undefined,
  isAuth: false,
  isInitializing: false,
  ...overrides,
})

const renderRoutes = (value: AuthContextParams, element: React.ReactNode) =>
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={["/current"]}>
        <Routes>
          <Route path="/current" element={element} />
          <Route path="/login" element={<p>login</p>} />
          <Route path="/" element={<p>table</p>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )

describe("route guards", () => {
  it("redirects unauthenticated users to login", () => {
    renderRoutes(
      createAuthValue(),
      <ProtectedRoute element={<p>protected</p>} />,
    )

    expect(screen.getByText("login")).toBeInTheDocument()
  })

  it("redirects authenticated users to the table", () => {
    renderRoutes(
      createAuthValue({ isAuth: true, token: "access" }),
      <PublicRoute element={<p>public</p>} />,
    )

    expect(screen.getByText("table")).toBeInTheDocument()
  })
})
