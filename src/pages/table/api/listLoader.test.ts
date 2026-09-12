import { describe, expect, it } from "vitest"
import { parseListQuery } from "./listLoader"

describe("parseListQuery", () => {
  it("uses page one when the page parameter is invalid", () => {
    expect(parseListQuery(new URL("https://example.test/?page=-2"))).toEqual({
      page: 1,
      search: undefined,
    })
  })

  it("returns valid pagination and search parameters", () => {
    expect(
      parseListQuery(new URL("https://example.test/?page=3&search=phone")),
    ).toEqual({ page: 3, search: "phone" })
  })
})
