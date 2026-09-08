import { fetchProducts } from "@/entities"
import type { LoaderFunctionArgs } from "react-router"

export const listLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const requestedPage = Number(url.searchParams.get("page"))
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1

  return await fetchProducts({ page })
}
