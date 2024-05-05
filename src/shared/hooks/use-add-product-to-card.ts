import { useAddCartMutation } from "@src/redux/api/cart-api-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { pushCart, setCart } from "@src/redux/slices/cart-slice";
import { GetProductItem } from "@src/shared/types/product";
import { useRouter } from "next/navigation";
import { USER_ID } from "@src/shared/constants/user";
import { useToast } from "@chakra-ui/react";

export const useAddProductToCard = (product: GetProductItem) => {
  const [addProductAnCart] = useAddCartMutation();

  const { cart } = useAppSelector((store) => store.cart);
  const { userId } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast()

  const onClickHandler = (move = false) => {
    const { category, id, image, price, title } = product
    const findCart = cart.find((item) => item.id === id)
    const oldCart = cart

    if (findCart) {
      const filterCart = cart?.map((features) => {
        if (features.id === id) {
          const copyFindCart = {...findCart}
          copyFindCart.quantity += 1
          return copyFindCart
        }
        return features
      })
  
      dispatch(setCart(filterCart))
    }
    else {
      dispatch(pushCart({ category, id, image, price, title, quantity: 1 }))
    }

    if (move) router.push('/cart')

    const data = { userId: userId || USER_ID, data: new Date(), products: [{ productId: product.id, quantity: 1 }] }
    addProductAnCart(data)
      .unwrap()
      .then()
      .catch(() => {
        toast({
          title: 'Не удалось добавить товар в корзину',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        dispatch(setCart(oldCart))
      })
  }

  return {
    onClickHandler,
  };
};
