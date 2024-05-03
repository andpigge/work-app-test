import React from "react";
import styles from "./product.module.scss";
import { Tag, Text, Button, ButtonGroup, Heading, Stack } from "@chakra-ui/react";
import Image from 'next/image'
import { GetProductItem } from "@src/shared/types/product";
import { useAppSelector } from "@src/redux/hooks";

type Props = {
  product: GetProductItem;
  cb: () => void
}

export const Product = ({ product, cb }: Props) => {
  const { authorizing } = useAppSelector((store) => store.user);

  return (
    <div className={styles.container}>
      <Image
        src={product.image}
        alt={product.title}
        width={500}
        height={500}
        className={styles.image}
      />
      <div className={styles.containerInfo}>
        <Stack mb='6' spacing='3'>
          <Heading size='md'>{product.title}</Heading>
          <Text>
            {product.description}
          </Text>
          <div className={styles.tag}>
            <Tag size='md' variant='outline' colorScheme='blue'>{product.category}</Tag>
          </div>
          <Text color='blue.600' fontSize='2xl'>
            {product.price} рублей
          </Text>
        </Stack>

        <ButtonGroup spacing='2' className={styles.containerButtons}>
          <Button
            type="button"
            variant='solid'
            colorScheme='blue'
            className='text-medium'
          >
            Добавить в корзину
          </Button>
          {authorizing && <Button
            type="button"
            variant='ghost'
            colorScheme='blue'
            className='text-medium'
            onClick={cb}
          >
            Редактировать
          </Button>}
        </ButtonGroup>
      </div>
    </div>
  )
}
