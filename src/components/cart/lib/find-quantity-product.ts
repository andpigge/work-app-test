import { Cart } from "@src/shared/types/cart";

export const findQuantityProduct = (cart: Cart, id: number) => cart.products.find((product) => product.productId === id)?.quantity
