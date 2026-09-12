import type { TokenPair } from "../model/auth-context"

type RefreshResponse = Partial<TokenPair>

export const refreshTokenRequest = async (
  refreshToken: string,
  fetchImpl: typeof fetch = fetch,
): Promise<TokenPair> => {
  const response = await fetchImpl("https://dummyjson.com/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken, expiresInMins: 15 }),
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Authentication refresh failed")
  }

  const data = (await response.json()) as RefreshResponse
  if (
    typeof data.accessToken !== "string" ||
    typeof data.refreshToken !== "string" ||
    !data.accessToken ||
    !data.refreshToken
  ) {
    throw new Error("Authentication refresh returned invalid tokens")
  }

  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }
}
