export interface Product {
  id: number
  title: string
  brand: string
  images: string[]
  rating: number
  sku: string
  price: number
}

export interface FetchProductParams {
  page?: number
  sortOrder?: "asc" | "desc" | null
}
