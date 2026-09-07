export interface Product {
  id: string
  name: string
  vendor: string
  article: string
  rating: number
  price: number
}

export const products: Product[] = [
  {
    id: "1",
    name: "Смартфон Galaxy S24",
    vendor: "Samsung",
    article: "SM-S921BZKDEUC",
    rating: 4.8,
    price: 89990,
  },
  {
    id: "2",
    name: "Ноутбук MacBook Air",
    vendor: "Apple",
    article: "MBA-M2-256",
    rating: 4.9,
    price: 119990,
  },
  {
    id: "3",
    name: "Беспроводные наушники WH-1000XM5",
    vendor: "Sony",
    article: "WH1000XM5B",
    rating: 4.7,
    price: 32990,
  },
]
