import { describe, expect, it } from "vitest"
import {
  createAuthSessionStorage,
  getAccessTokenExpiration,
} from "./auth-session"

describe("createAuthSessionStorage", () => {
  it("reads, writes, and clears valid sessions", () => {
    const storage = new Map<string, string>()
    const session = createAuthSessionStorage({
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    })
    const tokens = { accessToken: "access", refreshToken: "refresh" }

    session.write(tokens)
    expect(session.read()).toEqual(tokens)
    session.clear()
    expect(session.read()).toBeNull()
  })

  it("ignores invalid stored values", () => {
    const session = createAuthSessionStorage({
      getItem: () => JSON.stringify({ accessToken: "only-one-token" }),
      setItem: () => undefined,
      removeItem: () => undefined,
    })

    expect(session.read()).toBeNull()
  })
})

describe("getAccessTokenExpiration", () => {
  it("reads an expiration timestamp from a JWT payload", () => {
    const payload = btoa(JSON.stringify({ exp: 123 }))

    expect(getAccessTokenExpiration(`header.${payload}.signature`)).toBe(123000)
    expect(getAccessTokenExpiration("invalid-token")).toBeNull()
  })
})
