import React from "react";
import classNames from 'classnames/bind';

import { Input, Button, ButtonGroup, InputGroup, InputRightElement } from '@chakra-ui/react'
import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from "./authorization.module.scss";

const cx = classNames.bind(styles);

export const Authorization = ({cb}: {cb: () => void}) => {
  const submitForm = () => (console.log('authorization'))

  return (
    <form className={styles.container} onSubmit={submitForm}>
      <label>
        <p className={cx('text', 'text-medium')}>Email</p>
        <InputGroup>
          <Input
            className='text-medium'
            placeholder='Введите email'
          />
          <InputRightElement>
            <CheckIcon color='green.500' />
          </InputRightElement>
        </InputGroup>
      </label>

      <label>
        <p className={cx('text', 'text-medium')}>Пароль</p>
        <InputGroup>
          <Input
            className='text-medium'
            placeholder='Введите пароль'
          />
          <InputRightElement>
            <CheckIcon color='green.500' />
          </InputRightElement>
        </InputGroup>
      </label>

      <ButtonGroup spacing='2'>
        <Button
          type="submit"
          variant='solid'
          colorScheme='blue'
          className='text-medium'
        >
          Войти
        </Button>
        <Button
          onClick={cb}
          type="button"
          variant='ghost'
          colorScheme='blue'
          className='text-medium'
        >
          Зарегистрироваться
        </Button>
      </ButtonGroup>
    </form>
  )
}
