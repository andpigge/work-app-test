import { Product } from "@src/redux/slices/cart-slice";
import { Cart } from "@src/shared/types/cart"
import { GetProductItem } from "@src/shared/types/product"

export const getFilteredCart = (product: GetProductItem[], cart: Cart) => {
  return product.reduce((acc: Product[], features) => {
    cart.products.forEach((item) => {
      if (features.id === item.productId) {
        const { id, category, image, price, title } = features
        const newFeatures = { id, category, image, price, title, quantity: item.quantity }
        acc.push(newFeatures)
      }
    })
    return acc
  }, [])
}
