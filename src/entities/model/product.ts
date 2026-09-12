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

export interface FetchProductParams {
  page?: number
  sortOrder?: "asc" | "desc" | null
  search?: string
}
