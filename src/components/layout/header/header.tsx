"use client"

import React, { HTMLAttributes } from "react";
import classNames from "classnames/bind";

import styles from "./header.module.scss";
import { usePathname } from "next/navigation";
import { IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Skeleton, Stack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NAVIGATION_ACTIVE_USER, NAVIGATION_INACTIVE_USER } from "@src/shared/constants/navigation";
import NextLink from 'next/link'
import { useResize } from "@src/shared/hooks/use-resize";
import { MOBILE } from "@src/shared/breakpoints";

const cx = classNames.bind(styles);

type Props = {} & HTMLAttributes<HTMLDivElement>

export const Header = ({ className, ...props }: Props) => {
  const pathname = usePathname()

  const user = true

  const navigation = user ? NAVIGATION_ACTIVE_USER : NAVIGATION_INACTIVE_USER;
  const startHalf = Math.floor(navigation.length / 2) || 1

  const { isMobile } = useResize(MOBILE)

  const getLinkItem = (item: { id: number; alias: string; name: string; }) => {
    return (
      <li key={item.id} className={styles.item}>
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
