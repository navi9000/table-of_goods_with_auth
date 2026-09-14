import { fetchProducts, type ProductSortField } from "@/entities"
import type { LoaderFunctionArgs } from "react-router"

const sortFields: ProductSortField[] = ["title", "brand", "rating", "price"]

export const parseListQuery = (url: URL) => {
  const requestedPage = Number(url.searchParams.get("page"))
  const search = url.searchParams.get("search") ?? undefined
  const requestedSortBy = url.searchParams.get("sortBy")
  const requestedSortOrder = url.searchParams.get("sortOrder")
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const sortBy = sortFields.includes(requestedSortBy as ProductSortField)
    ? (requestedSortBy as ProductSortField)
    : undefined
  const sortOrder: "asc" | "desc" | null =
    requestedSortOrder === "asc" || requestedSortOrder === "desc"
      ? requestedSortOrder
      : null

  return {
    page,
    search,
    sortBy: sortBy && sortOrder ? sortBy : undefined,
    sortOrder: sortBy && sortOrder ? sortOrder : null,
  }
}

export const listLoader = async ({ request }: LoaderFunctionArgs) => {
  const { page, search, sortBy, sortOrder } = parseListQuery(
    new URL(request.url),
  )

  return await fetchProducts({ page, search, sortBy, sortOrder })
}
