'use client';

import React, { ReactNode, useEffect } from "react";
import { Header } from "@src/components/layout/header";
import styles from './layout.module.scss';
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useLazyGetUsersQuery } from "@src/redux/api/users-api-slice";
import { getCookie } from "typescript-cookie";
import { setAuthorizing, setUsers } from "@src/redux/slices/users-slice";
import { useToast } from '@chakra-ui/react'
import { setCart, setCartId, setCartSuccess } from "@src/redux/slices/cart-slice";
import { useGetCartUserQuery } from "@src/redux/api/cart-api-slice";
import { getFilteredCart } from "@src/components/cart/lib/get-filtered-cart";
import { USER_ID } from "@src/shared/constants/user";
import { useLazyGetProductsQuery } from "@src/redux/api/products-api-slice";

export const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const [getProducts] = useLazyGetProductsQuery()

  const { userId } = useAppSelector((store) => store.user);

  const [getUsers] = useLazyGetUsersQuery();
  const {data = [], isSuccess: isSuccessGetCart} = useGetCartUserQuery(userId || USER_ID);

  const { cartSuccess } = useAppSelector((store) => store.cart);

  const toast = useToast()

  useEffect(() => {
    if (!getCookie("access_token")) {
      return;
    }

    getUsers()
      .unwrap()
      .then((data) => {
        dispatch(setUsers(data || null));

        if (!Object.keys(data).length) {
          console.log("🚀 ~ file: app-layout.tsx:28 ~ useEffect ~ error:", "Объект пользователя пришел пустым");
          return;
        }

        dispatch(setAuthorizing(true));
      })
      .catch((error) => {
        console.log("🚀 ~ file: app-layout.tsx:36 ~ useEffect ~ error:", error);
        toast({
          title: error.data || "Аккаунт не найден",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
  }, [dispatch, getUsers]);

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

  return (
    <>
      <Header className={styles.header} />
      <main className={styles.main}>{children}</main>
    </>
  );
};
