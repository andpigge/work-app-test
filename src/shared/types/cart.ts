export type Products = {
  productId: number,
  quantity: number
}[]

export type Cart = {
  id: number;
  date: string;
  products: Products
  userId: number;
}

export type EditCart = {
  userId?: number;
  date?: string;
  products: { productId: number, quantity: number }[]
}
