export interface Product {
  id: number
  title: string
  brand: string
  category: string
  images: string[]
  rating: number
  sku: string
  price: number
  availabilityStatus: string
}

export type ProductSortField = "title" | "brand" | "rating" | "price"

export interface FetchProductParams {
  page?: number
  sortBy?: ProductSortField
  sortOrder?: "asc" | "desc" | null
  search?: string
}
