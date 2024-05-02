import React from "react";
import classNames from 'classnames/bind';

import styles from "./cart.module.scss";
import { Tag, Text, Button, ButtonGroup, Heading, Stack, Input } from "@chakra-ui/react";
import Image from 'next/image'
import { DeleteIcon } from '@chakra-ui/icons'

const cx = classNames.bind(styles);

export const Cart = () => {
  const deleteCard = () => console.log('deleted')

  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        <li className={styles.item}>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            width={140}
            height={140}
            className={styles.image}
          />
          <div className={styles.containerInfo}>
            <div className={styles.tag}>
              <Tag size='md' variant='outline' colorScheme='blue'>Мебель</Tag>
            </div>
            <h2 className={cx('headline2', 'limit-two-lines')}>Living room Sofa</h2>
          </div>

          <div className={styles.containerCount}>
            <div className={styles.containerText}>
              <p className={cx('price', 'text-large', 'limit-text')}>
                450
              </p>
              <p className={cx('price', 'text-large')}>
                &nbsp;&#8381;
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <Button variant='solid' size='sm' borderRadius={0}>+</Button>
                <Input type="text" value='3' width={62} className={styles.fieldCount} size='sm' />
              <Button variant='solid' size='sm' borderRadius={0}>-</Button>
            </div>
          </div>

          <button className={styles.button} onClick={deleteCard}>
            <DeleteIcon w={6} h={6} color="red.500" />
          </button>
        </li>
      </ul>

      <div className={styles.containerSum}>
        <h2 className={cx('headline2', 'titleSum')}>
          Ваш заказ
        </h2>
        <ul className={styles.list}>
          <li>
            <p className="text-medium">
              Товары, 3 шт.
            </p>
          </li>
          <li className={styles.containerPrice}>
            <h3 className="headline3">
              Итого
            </h3>
            <p className={`${styles.price} text-large`}>
              1350 Рублей
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
