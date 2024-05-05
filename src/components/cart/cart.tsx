import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';

import styles from "./cart.module.scss";
import { Card } from "./card";
import { useGetCartUserQuery } from "@src/redux/api/cart-api-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setCart, setCartId, setCartSuccess } from "@src/redux/slices/cart-slice";
import { useLazyGetProductsQuery } from "@src/redux/api/products-api-slice";
import { getFilteredCart } from "./lib/get-filtered-cart";
import { USER_ID } from "./constants";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const cx = classNames.bind(styles);

export const Cart = () => {
  const [getProducts, { isSuccess: isSuccessProduct, isLoading: isLoadingProduct }] = useLazyGetProductsQuery()
  const { cart, cartSuccess, total } = useAppSelector((store) => store.cart);
  const { userId } = useAppSelector((store) => store.user);

  const {data = [], isSuccess: isSuccessGetCart, isLoading: isLoadingGetCart} = useGetCartUserQuery(userId || USER_ID);

  const dispatch = useAppDispatch();

  const [ isReady, setIsReady ] = useState(false)

  const toast = useToast()

  useEffect(() => {
    if (isSuccessGetCart && !cartSuccess) {
      getProducts()
      .unwrap()
      .then((products) => {
        const cart = getFilteredCart(products, data[0])
        dispatch(setCart(cart))
        dispatch(setCartId(data[0].id))
        dispatch(setCartSuccess())
      });
    }
  }, [isSuccessGetCart, cartSuccess])

  useEffect(() => {
    if (isSuccessProduct && isSuccessGetCart) {
      setIsReady(true)
    }
  }, [isSuccessProduct, isSuccessGetCart])

  const onClickHandler = () => {
    toast({
      title: 'Ваш заказ оформлен',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        {cart?.map((features) => {
          return (
            <li key={features.id} className={styles.item}>
              <Card features={features} setIsReady={setIsReady} />
            </li>
          )
        })}
        { ((!isLoadingGetCart && !isLoadingProduct && !cart?.length && <h2 className="headline2">Закажите что-нибудь</h2>)) }
      </ul>

      {total && <div className={styles.containerSum}>
        <h2 className={cx('headline2', 'titleSum')}>
          Ваш заказ
        </h2>
        <ul className={styles.list}>
          <li>
            <p className="text-medium">
              Товары, {total?.quantity} шт.
            </p>
          </li>
          <li className={styles.containerPrice}>
            <h3 className="headline3">
              Итого
            </h3>
            <p className={`${styles.price} text-large`}>
            {total?.price.toFixed(2)} Рублей
            </p>
          </li>
          {cart?.length ? <Button variant='solid' colorScheme='blue' isLoading={!isReady} loadingText='Оформить заказ' disabled onClick={onClickHandler}>
            Оформить заказ
          </Button> : undefined}
        </ul>
      </div>}
    </div>
  )
}
