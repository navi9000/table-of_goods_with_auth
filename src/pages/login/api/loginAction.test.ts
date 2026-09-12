import { describe, expect, it, vi } from "vitest"
import { loginRequest, parseLoginForm } from "./loginAction"

describe("parseLoginForm", () => {
  it("reads credentials and the remember flag", () => {
    const formData = new FormData()
    formData.set("username", "john")
    formData.set("password", "secret123")
    formData.set("remember", "on")

    expect(parseLoginForm(formData)).toEqual({
      username: "john",
      password: "secret123",
      remember: true,
    })
  })
})

describe("loginRequest", () => {
  it("sends credentials and returns the API payload", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ accessToken: "access", refreshToken: "refresh" }),
          { status: 200 },
        ),
      )

    await expect(
      loginRequest(
        { username: "john", password: "secret123", remember: false },
        fetchImpl,
      ),
    ).resolves.toEqual({ accessToken: "access", refreshToken: "refresh" })

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://dummyjson.com/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          username: "john",
          password: "secret123",
          expiresInMins: 15,
        }),
      }),
    )
  })
})
