import { describe, expect, it, vi } from "vitest"
import { refreshTokenRequest } from "./refreshToken"

describe("refreshTokenRequest", () => {
  it("returns refreshed tokens", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ accessToken: "access", refreshToken: "refresh" }),
          { status: 200 },
        ),
      )

    await expect(
      refreshTokenRequest("old-refresh", fetchImpl),
    ).resolves.toEqual({ accessToken: "access", refreshToken: "refresh" })
  })

  it("rejects invalid responses", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }))

    await expect(refreshTokenRequest("old-refresh", fetchImpl)).rejects.toThrow(
      "Authentication refresh returned invalid tokens",
    )
  })
})
