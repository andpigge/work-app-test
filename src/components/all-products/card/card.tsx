import React from "react";

import { Card as CardItem, Tag, Text, Button, ButtonGroup, CardBody, CardFooter, Divider, Heading, Stack, useToast } from "@chakra-ui/react";
import NextLink from 'next/link'
import { LinkBox } from '@chakra-ui/react'
import styles from './card.module.scss'
import { DeleteIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { GetProductItem } from "@src/shared/types/product";
import { useDeleteProductMutation } from "@src/redux/api/products-api-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setProducts } from "@src/redux/slices/products-slice";
import { pushCart, setCart } from "@src/redux/slices/cart-slice";
import { useAddCartMutation } from "@src/redux/api/cart-api-slice";
import { USER_ID } from "@src/shared/constants/user";
import { useRouter } from "next/navigation";

export const Card = ({ product }: { product: GetProductItem }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const { products } = useAppSelector((store) => store.products);
  const { cart } = useAppSelector((store) => store.cart);
  const { userId } = useAppSelector((store) => store.user);
  const router = useRouter();

  const toast = useToast()

  const dispatch = useAppDispatch();

  const [addProductAnCart] = useAddCartMutation();

  const deleteCard = () => {
    const newProducts = products?.concat() || []
    const productsFilter = newProducts?.filter((item) => item.id !== product.id) || []
    dispatch(setProducts(productsFilter))

    deleteProduct(product.id)
      .unwrap()
      .then()
      .catch((error: { data: string }) => {
        dispatch(setProducts(newProducts))
        toast({
          title: error.data,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })

      const filterCart = cart?.filter((item) => item.id !== product.id) || []
      dispatch(setCart(filterCart || []))
  }

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

  const buttonComponent = () => {
    const findCart = cart.find((item) => item.id === product.id)

    return (
      <Button variant='ghost' colorScheme='blue' onClick={() => onClickHandler(false)}>
        {findCart ? `Добавить еще (${findCart.quantity})` : 'Добавить в корзину'}
      </Button>
    )
  }

  return (
      <CardItem maxW='sm' className={styles.card} height={'100%'}>
        <CardBody>
          <button className={styles.button} onClick={deleteCard}>
            <DeleteIcon w={6} h={6} color="red.500" />
          </button>
          <LinkBox as={NextLink} href={`/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              width={344}
              height={280}
              className={styles.image}
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{product.title}</Heading>
              <Text className="limit-two-lines">
                {product.description}
              </Text>
              <div className={styles.tag}>
                <Tag size='md' variant='outline' colorScheme='blue'>{product.category}</Tag>
              </div>
              <Text color='blue.600' fontSize='2xl'>
                {product.price} рублей
              </Text>
            </Stack>
          </LinkBox>
        </CardBody>

        <Divider />

        <CardFooter>
          <ButtonGroup spacing='2' className={styles.containerButtons}>
            <Button variant='solid' colorScheme='blue' onClick={() => onClickHandler(true)}>
              Купить товар
            </Button>
            { buttonComponent() }
          </ButtonGroup>
        </CardFooter>
      </CardItem>
  )
}
