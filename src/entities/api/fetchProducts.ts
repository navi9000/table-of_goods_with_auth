import type { Product, FetchProductParams } from "../model/product"

export const fetchProducts = async (input: FetchProductParams = {}) => {
  const page = input?.page ?? 1
  const sortOrder = input?.sortOrder
  const search = input?.search
  let requestInfo = "https://dummyjson.com/products"
  if (search) {
    requestInfo += `/search?q=${search}&limit=10`
  } else {
    requestInfo += "?limit=10"
  }

  if (page > 1) {
    requestInfo += `&skip=${page * 10 - 10}`
  }
  if (sortOrder) {
    requestInfo += `&sortBy=title&order=${sortOrder}`
  }
  return fetch(requestInfo)
    .then((res) => res.json())
    .then((data) => ({
      data: data.products as Product[],
      meta: {
        pagination: {
          page: data.skip / 10 + 1,
          total: data.total as number,
          totalPage: Math.ceil(data.total / 10),
          limit: data.limit as number,
        },
      },
    }))
}
