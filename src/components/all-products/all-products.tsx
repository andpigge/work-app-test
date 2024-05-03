import React, { useEffect, useState } from "react";
import styles from "./all-products.module.scss";
import { Card } from "./card";
import { useGetProductsQuery } from "@src/redux/api/products-api-slice";
import { setProducts, setProductsSuccess } from "@src/redux/slices/products-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";

export const AllProducts = () => {
  const {data = [], isSuccess} = useGetProductsQuery();
  const { products, productsSuccess } = useAppSelector((store) => store.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && !productsSuccess) {
      dispatch(setProducts(data))
      dispatch(setProductsSuccess())
    }
  }, [dispatch, isSuccess, productsSuccess])

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {products &&
          products.map((product) => {
            return (<li key={product.id}>
              <Card product={product} />
            </li>)
          })
        }
      </ul>
    </div>
  )
}
