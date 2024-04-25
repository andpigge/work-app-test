"use client"

import React from "react";
import classNames from "classnames/bind";

import styles from "./header.module.scss";
import { usePathname } from "next/navigation";
import { IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NAVIGATION_ACTIVE_USER, NAVIGATION_INACTIVE_USER } from "@src/shared/constants/navigation";
import NextLink from 'next/link'
import { useResize } from "@src/shared/hooks/use-resize";

const cx = classNames.bind(styles);

export const Header = () => {
  const pathname = usePathname()

  const user = true

  const navigation = user ? NAVIGATION_ACTIVE_USER : NAVIGATION_INACTIVE_USER;
  const startHalf = Math.floor(navigation.length / 2) || 1

  const { isMobile } = useResize(610)

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

  return (
    <div className={styles.container}>
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
    </div>
  )
}
