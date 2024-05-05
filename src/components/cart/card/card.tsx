import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import classNames from 'classnames/bind';

import styles from "./card.module.scss";
import { Tag } from "@chakra-ui/react";
import Image from 'next/image'
import { DeleteIcon } from '@chakra-ui/icons'
import { Product, setCart } from "@src/redux/slices/cart-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useEditCartMutation, useGetCartUserQuery } from "@src/redux/api/carts-api-slice";
import { CountingNumber } from "@src/shared/ui/сounting-number";
import { CHANGE_INTERVAL_CART, USER_ID } from "../constants";
import { findQuantityProduct } from "../lib/find-quantity-product";

const cx = classNames.bind(styles);

type Props = {
  features: Product;
  setIsReady: Dispatch<SetStateAction<boolean>>;
}

export const Card = ({ features, setIsReady }: Props) => {
  const { userId } = useAppSelector((store) => store.user);
  const { cart, cartId } = useAppSelector((store) => store.cart);

  // TODO isError выдавать страницу 500
  const [updateCart, { isError }] = useEditCartMutation()
  const {data = []} = useGetCartUserQuery(userId || USER_ID);

  const [counter, setCounter] = useState(features.quantity);
  const [allowed, setAllowed] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

  const dispatch = useAppDispatch();

  const setTimeoutAllowed = () => {
    if (timerId) return
    const id = setTimeout(() => {
      setAllowed(true)
      setTimerId(null)
    }, CHANGE_INTERVAL_CART)
    setTimerId(id)
  };

  useEffect(() => {
    setTimeoutAllowed()
  }, [counter])

  useEffect(() => {
    if (findQuantityProduct(data[0], features.id) === counter) {
      setIsReady(true)
      return
    }

    setIsReady(false)

    const { quantity, ...restFeatures } = features
    const newCart = { quantity: counter, ...restFeatures }

    const filterCart = cart?.map((features) => {
      if (features.id === newCart.id) {
        return newCart
      }
      return features
    })

    dispatch(setCart(filterCart || []))

    if (!allowed) return

    setAllowed(false)

    const editData = filterCart?.map((item) => (
      { productId: item.id, quantity: item.quantity }
    ))

    editData && cartId && updateCart({ cartId, data: { products: editData } })
      .unwrap()
      .then(() => {
        setIsReady(true)
      })
  }, [counter, allowed])

  const deleteCard = () => console.log('deleted')

  return (
    <>
      <Image
        src={features.image}
        alt={features.title}
        width={140}
        height={140}
        className={styles.image}
      />
      <div className={styles.containerInfo}>
        <div>
          <Tag size='md' variant='outline' colorScheme='blue'>{features.category}</Tag>
        </div>
        <h2 className={cx('headline2', 'limit-two-lines')}>{features.title}</h2>
      </div>

      <div className={styles.containerCount}>
        <div className={styles.containerText}>
          <p className={cx('price', 'text-large', 'limit-text')}>
            {(features.price * counter).toFixed(2)}
          </p>
          <p className={cx('price', 'text-large')}>
            &nbsp;&#8381;
          </p>
        </div>
        <CountingNumber counter={counter} setCounter={setCounter} />
      </div>

      <button className={styles.button} onClick={deleteCard}>
        <DeleteIcon w={6} h={6} color="red.500" />
      </button>
    </>
  )
}
