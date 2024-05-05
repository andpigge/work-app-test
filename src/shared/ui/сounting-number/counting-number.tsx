import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button, Input } from "@chakra-ui/react"
import styles from "./counting-number.module.scss";
import { MAX_COUNT_PRODUCTS } from "@src/components/cart/constants";

export const CountingNumber = ({ counter, setCounter }: { counter: number; setCounter: Dispatch<SetStateAction<number>> }) => {
  const addCounter = () => {
    setCounter((prev) => {
      if (prev >= MAX_COUNT_PRODUCTS) return prev

      prev++
      return prev
    })
  }

  const subtractCounter = () => {
    setCounter((prev) => {
      if (prev <= 1) return prev

      prev--
      return prev
    })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value > MAX_COUNT_PRODUCTS || value < 1) return
    setCounter(value)
  }

  return (
    <div className={styles.container}>
      <Button variant='solid' size='sm' borderRadius={0} onClick={addCounter}>+</Button>
        <Input type="text" value={counter} onChange={onChange} width={62} className={styles.fieldCount} size='sm' />
      <Button variant='solid' size='sm' borderRadius={0} onClick={subtractCounter}>-</Button>
    </div>
  )
}
