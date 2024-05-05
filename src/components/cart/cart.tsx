import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';

import styles from "./cart.module.scss";
import { Card } from "./card";
import { useAppSelector } from "@src/redux/hooks";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const cx = classNames.bind(styles);

export const Cart = () => {
  const { productsSuccess } = useAppSelector((store) => store.products);
  const { cart, total, cartSuccess } = useAppSelector((store) => store.cart);

  const [ isReady, setIsReady ] = useState(false)

  const toast = useToast()

  useEffect(() => {
    if (productsSuccess && cartSuccess) {
      setIsReady(true)
    }
  }, [productsSuccess, cartSuccess])

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
        { (((!cart?.length && !productsSuccess || !cartSuccess) ? <h2 className="headline2">Закажите что-нибудь</h2> : undefined)) }
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
