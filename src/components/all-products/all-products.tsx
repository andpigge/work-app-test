import React from "react";
import styles from "./all-products.module.scss";
import { Card } from "./card";

export const AllProducts = () => {
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
