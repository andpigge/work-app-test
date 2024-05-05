import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';

import styles from "./cart.module.scss";
import { Card } from "./card";
import { useGetCartUserQuery } from "@src/redux/api/carts-api-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setCart, setCartId, setCartSuccess } from "@src/redux/slices/cart-slice";
import { useLazyGetProductsQuery } from "@src/redux/api/products-api-slice";
import { getFilteredCart } from "./lib/get-filtered-cart";
import { USER_ID } from "./constants";
import { Button } from "@chakra-ui/react";

const cx = classNames.bind(styles);

export const Cart = () => {
  const [getProducts, { isSuccess: isSuccessProduct }] = useLazyGetProductsQuery()
  const { cart, cartSuccess, total } = useAppSelector((store) => store.cart);
  const { userId } = useAppSelector((store) => store.user);

  const {data = [], isSuccess: isSuccessGetCart} = useGetCartUserQuery(userId || USER_ID);

  const dispatch = useAppDispatch();

  const [ isReady, setIsReady ] = useState(false)

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
    console.log(isReady)
  }, [isReady])

  useEffect(() => {
    if (isSuccessProduct && isSuccessGetCart) {
      console.log(1)
      setIsReady(true)
    }
  }, [isSuccessProduct, isSuccessGetCart])

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
          <Button variant='solid' colorScheme='blue' isLoading={!isReady} loadingText='Оформить заказ'>
            Оформить заказ
          </Button>
        </ul>
      </div>}
    </div>
  )
}
