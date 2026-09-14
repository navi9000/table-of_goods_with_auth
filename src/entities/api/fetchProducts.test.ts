import { describe, expect, it, vi } from "vitest"
import { buildProductsUrl, fetchProducts } from "./fetchProducts"

describe("buildProductsUrl", () => {
  it("returns the default URL with only the limit query param when no parameters are provided", () => {
    const actualUrl = buildProductsUrl()
    expect(actualUrl).toBe("https://dummyjson.com/products?limit=10")
  })
  it("returns the search URL when a search parameter was provided", () => {
    const search = "text"
    const actualUrl = buildProductsUrl({ search })
    expect(actualUrl).toBe(
      `https://dummyjson.com/products/search?q=${search}&limit=10`,
    )
  })
  it("builds a paginated search URL when all parameters were provided", () => {
    expect(
      buildProductsUrl({
        page: 2,
        search: "phone",
        sortBy: "price",
        sortOrder: "desc",
      }),
    ).toBe(
      "https://dummyjson.com/products/search?q=phone&limit=10&skip=10&sortBy=price&order=desc",
    )
  })

  it("omits sorting when the sort order is initial", () => {
    expect(buildProductsUrl({ sortBy: "title", sortOrder: null })).toBe(
      "https://dummyjson.com/products?limit=10",
    )
  })
})

describe("fetchProducts", () => {
  it("maps the API response into the table contract", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          products: [{ id: 1, title: "Phone" }],
          skip: 10,
          total: 21,
          limit: 10,
        }),
        { status: 200 },
      ),
    )

    await expect(fetchProducts({ page: 2 }, fetchImpl)).resolves.toEqual({
      data: [{ id: 1, title: "Phone" }],
      meta: { pagination: { page: 2, total: 21, totalPage: 3, limit: 10 } },
    })
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://dummyjson.com/products?limit=10&skip=10",
    )
  })

  it("rejects failed responses", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 503 }))

    await expect(fetchProducts({}, fetchImpl)).rejects.toThrow(
      "Products request failed",
    )
  })
})
