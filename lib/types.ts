export interface Product {
  sku: string
  name: string
  description: string
  image: string
  category: Category
  brand: string
  price: number
  stock: number
}

export interface ProductDetails extends Product {
  specifications: Specifications[]
}

export interface Category {
  id: number
  name: string
}

export interface Specifications {
  name: string
  value: string
}