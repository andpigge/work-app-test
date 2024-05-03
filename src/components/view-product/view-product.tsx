import React, { useState } from "react";
import classNames from 'classnames/bind';

import styles from "./view-product.module.scss";
import { Product } from "./product";
import { EditProductForm } from "./edit-product-form";
import { getCookie } from "@src/shared/lib/get-cookie";

const cx = classNames.bind(styles);

const title = {
  view: 'Просмотр продукта',
  edit: 'Редактирование продукта'
}

export const ViewProduct = ({ productId }: { productId: string }) => {
  const [typeForm, setTypeForm] = useState<'view' | 'edit'>('view');

  const authorizing = getCookie("access_token")

  const setView = () => setTypeForm('view')
  const setEdit = () => setTypeForm('edit')

  return (
    <div>
      <h1 className={cx('headline1', 'title')}>{title[typeForm]}</h1>
      {typeForm === 'view' && <Product cb={setEdit} />}
      {(typeForm === 'edit' && authorizing) && <EditProductForm cb={setView} />}
    </div>
  )
}
