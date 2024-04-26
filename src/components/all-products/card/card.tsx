import React from "react";

import { Card as CardItem, Tag, Image, Text, Button, ButtonGroup, CardBody, CardFooter, Divider, Heading, Stack } from "@chakra-ui/react";
import NextLink from 'next/link'
import { LinkBox } from '@chakra-ui/react'
import styles from './card.module.scss'
import { DeleteIcon } from '@chakra-ui/icons'

export const Card = () => {
  const deleteCard = () => console.log('deleted')

  return (
      <CardItem maxW='sm' className={styles.card}>
        <CardBody>
          <button className={styles.button} onClick={deleteCard}>
            <DeleteIcon w={6} h={6} color="red.500" />
          </button>
          <LinkBox as={NextLink} href='/1'>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
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
          </LinkBox>
        </CardBody>

        <Divider />

        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Купить товар
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Добавить в корзину
            </Button>
          </ButtonGroup>
        </CardFooter>
      </CardItem>
  )
}
