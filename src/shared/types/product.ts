export type GetProductItem = {
  id: number;
  title: string,
  price: number,
  description: string,
  image: string,
  category: string,
  rating: { rate: number, count: number }
}

export type PostProductItem = {
  title: string,
  price: number,
  description: string,
  image: string,
  category: string,
  rating?: { rate: number, count: number }
}
