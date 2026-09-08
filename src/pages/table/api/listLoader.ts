import { fetchProducts } from "@/entities"

export const listLoader = async () => {
  return await fetchProducts()
}
