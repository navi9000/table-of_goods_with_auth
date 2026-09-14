import type { Product, FetchProductParams } from "../model/product"

const productsUrl = "https://dummyjson.com/products"

export const buildProductsUrl = (input: FetchProductParams = {}) => {
  const page = input?.page ?? 1
  const sortBy = input?.sortBy
  const sortOrder = input?.sortOrder
  const search = input?.search
  let requestInfo = productsUrl
  if (search) {
    requestInfo += `/search?q=${search}&limit=10`
  } else {
    requestInfo += "?limit=10"
  }

  if (page > 1) {
    requestInfo += `&skip=${page * 10 - 10}`
  }
  if (sortBy && sortOrder) {
    requestInfo += `&sortBy=${sortBy}&order=${sortOrder}`
  }

  return requestInfo
}

interface ProductsResponse {
  products: Product[]
  skip: number
  total: number
  limit: number
}

export const fetchProducts = async (
  input: FetchProductParams = {},
  fetchImpl: typeof fetch = fetch,
) => {
  const response = await fetchImpl(buildProductsUrl(input))
  if (!response.ok) {
    throw new Error("Products request failed")
  }

  const data = (await response.json()) as ProductsResponse
  return {
    data: data.products,
    meta: {
      pagination: {
        page: data.skip / 10 + 1,
        total: data.total,
        totalPage: Math.ceil(data.total / 10),
        limit: data.limit,
      },
    },
  }
}
