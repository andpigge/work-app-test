import React, { useState } from "react";
import classNames from 'classnames/bind';

import styles from "./authentication.module.scss";
import { Authorization } from "./authorization";
import { Registration } from "./registration";

const cx = classNames.bind(styles);

const title = {
  auth: 'Авторизация',
  reg: 'Регистрация'
}

export const Authentication = () => {
  const [typeForm, setTypeForm] = useState<'auth' | 'reg'>('auth');

  const setAuthorization = () => setTypeForm('auth')
  const setRegistration = () => setTypeForm('reg')

  return (
    <div className={styles.container}>
      <>
        <h1 className={cx('headline1', 'title')}>
          {title[typeForm]}
        </h1>
        { typeForm === 'auth' && <Authorization cb={setRegistration} /> }
        { typeForm === 'reg' && <Registration cb={setAuthorization} /> }
      </>
    </div>
  )
}
