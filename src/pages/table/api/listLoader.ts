import { fetchProducts } from "@/entities"
import type { LoaderFunctionArgs } from "react-router"

export const parseListQuery = (url: URL) => {
  const requestedPage = Number(url.searchParams.get("page"))
  const search = url.searchParams.get("search") ?? undefined
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1

  return { page, search }
}

export const listLoader = async ({ request }: LoaderFunctionArgs) => {
  const { page, search } = parseListQuery(new URL(request.url))

  return await fetchProducts({ page, search })
}
