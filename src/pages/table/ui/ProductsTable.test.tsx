import { describe, expect, it } from "vitest"
import { getDisplayedProductRange } from "../model/products-table"

describe("getDisplayedProductRange", () => {
  it("returns an empty range for an empty page", () => {
    expect(
      getDisplayedProductRange(0, {
        page: 1,
        total: 0,
        totalPage: 0,
        limit: 10,
      }),
    ).toEqual({ firstItem: 0, lastItem: 0 })
  })

  it("caps the last item at the total product count", () => {
    expect(
      getDisplayedProductRange(1, {
        page: 3,
        total: 21,
        totalPage: 3,
        limit: 10,
      }),
    ).toEqual({ firstItem: 21, lastItem: 21 })
  })
})
