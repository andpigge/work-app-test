import React from "react";
import styles from "./product.module.scss";
import { Tag, Text, Button, ButtonGroup, Heading, Stack } from "@chakra-ui/react";
import Image from 'next/image'
import { ProductItem } from "@src/shared/types/product";

type Props = {
  product?: ProductItem;
  cb: () => void
}

export const Product = ({ product, cb }: Props) => {
  return (
    <div className={styles.container}>
      <Image
        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Green double couch with wooden legs'
        width={500}
        height={500}
      />
      <div className={styles.containerInfo}>
        <Stack mb='6' spacing='3'>
          <Heading size='md'>Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text>
          <div className={styles.tag}>
            <Tag size='md' variant='outline' colorScheme='blue'>Мебель</Tag>
          </div>
          <Text color='blue.600' fontSize='2xl'>
            450 Рублей
          </Text>
        </Stack>

        <ButtonGroup spacing='2' className={styles.containerButtons}>
          <Button variant='solid' colorScheme='blue'>
            Добавить в корзину
          </Button>
          <Button variant='ghost' colorScheme='blue' onClick={cb}>
            Редактировать
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
