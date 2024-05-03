import React, { useState } from "react";
import classNames from 'classnames/bind';

import styles from "./view-product.module.scss";
import { Product } from "./product";
import { EditProductForm } from "./edit-product-form";
import { getCookie } from "@src/shared/lib/get-cookie";
import { useAppSelector } from "@src/redux/hooks";

const cx = classNames.bind(styles);

const title = {
  view: 'Просмотр продукта',
  edit: 'Редактирование продукта'
}

export const ViewProduct = ({ productId }: { productId: string }) => {
  const [typeForm, setTypeForm] = useState<'view' | 'edit'>('view');

  const { products } = useAppSelector((store) => store.products);
  const product = products?.find((item) => item.id === Number(productId))

  const authorizing = getCookie("access_token")

  const setView = () => setTypeForm('view')
  const setEdit = () => setTypeForm('edit')

  return (
    product && <div>
      <h1 className={cx('headline1', 'title')}>{title[typeForm]}</h1>
      {typeForm === 'view' && <Product product={product} cb={setEdit} />}
      {(typeForm === 'edit' && authorizing) && <EditProductForm product={product} cb={setView} />}
    </div>
  )
}
