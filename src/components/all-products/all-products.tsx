import React, { useEffect } from "react";
import styles from "./all-products.module.scss";
import { Card } from "./card";
import { useGetProductsQuery } from "@src/redux/api/products-api-slice";

export const AllProducts = () => {
  const {data: products} = useGetProductsQuery();

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
      </ul>
    </div>
  )
}
