"use client"

import React, { HTMLAttributes } from "react";
import classNames from "classnames/bind";

import styles from "./header.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Skeleton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NAVIGATION_ACTIVE_USER, NAVIGATION_INACTIVE_USER } from "@src/shared/constants/navigation";
import NextLink from 'next/link'
import { useResize } from "@src/shared/hooks/use-resize";
import { MOBILE } from "@src/shared/breakpoints";
import { removeCookie } from "typescript-cookie";
import { useAppDispatch } from "@src/redux/hooks";
import { setUsers, setAuthorizing } from "@src/redux/slices/users-slice";
import { getCookie } from "@src/shared/lib/get-cookie";

const cx = classNames.bind(styles);

type Props = {} & HTMLAttributes<HTMLDivElement>

export const Header = ({ className, ...props }: Props) => {
  const pathname = usePathname()

  const router = useRouter();
  const dispatch = useAppDispatch();
  const authorizing = getCookie("access_token")

  const navigation = authorizing ? NAVIGATION_ACTIVE_USER : NAVIGATION_INACTIVE_USER;
  const startHalf = Math.floor(navigation.length / 2) || 1

  const { isMobile } = useResize(MOBILE)

  const onHandlerClick = () => {
    router.push("/authentication");
    removeCookie("access_token");
    dispatch(setUsers(null));
    dispatch(setAuthorizing(false));
  };

  const getLinkItem = (item: { id: number; alias: string; name: string; exit?: true }) => {
    return (
      <li key={item.id} className={styles.item} onClick={item.exit ? onHandlerClick : undefined}>
        <Link
          color={pathname === item.alias ? 'teal.500' : undefined}
          as={NextLink}
          href={item.alias}>{item.name}
        </Link>
      </li>
    )
  }

  const getMenu = () => {
    if (isMobile === null) {
      return (
        <>
          <Skeleton width='20%' height='22px' />
          <Skeleton width='20%' height='22px' />
        </>
      )
    }

    return (
      <>
        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
                {navigation.slice(0, startHalf).map((item) => {
                  return (
                    <MenuItem
                      key={item.id}
                      color={pathname === item.alias ? 'teal.500' : undefined}
                      as={NextLink}
                      href={item.alias}>{item.name}
                    </MenuItem>
                  )
                })}
            </MenuList>
          </Menu>
        ) : (
          <ul className={styles.list}>
            {navigation.slice(0, startHalf).map((item) => {
              return getLinkItem(item)
            })}
          </ul>
        )}

        <ul className={styles.list}>
          {navigation.slice(startHalf, navigation.length).map((item) => {
            return getLinkItem(item)
          })}
        </ul>
      </>
    )
  }

  return (
    <header className={cx('container', className)} {...props}>
      { getMenu() }
    </header>
  )
}
