'use client';

import React, { ReactNode, useEffect } from "react";
import { Header } from "@src/components/layout/header";
import styles from './layout.module.scss';
import { useAppDispatch } from "@src/redux/hooks";
import { useLazyGetUsersQuery } from "@src/redux/api/users-api-slice";
import { getCookie } from "typescript-cookie";
import { setAuthorizing, setUsers } from "@src/redux/slices/users-slice";
import { useToast } from '@chakra-ui/react'

export const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const [getUsers] = useLazyGetUsersQuery();
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

  return (
    <>
      <Header className={styles.header} />
      <main className={styles.main}>{children}</main>
    </>
  );
};
