import React from "react";
import classNames from 'classnames/bind';

import { Input, Button, ButtonGroup, InputGroup, InputRightElement, InputLeftElement, Textarea } from '@chakra-ui/react'
import { CheckIcon,  } from '@chakra-ui/icons'
import styles from "./edit-product-form.module.scss";

const cx = classNames.bind(styles);

export const EditProductForm = ({cb}: {cb: () => void}) => {
  const submitForm = () => (console.log('authorization'))

  return (
    <div className={styles.container}>
      <form className={styles.containerFields} onSubmit={submitForm}>
        <label>
          <p className={cx('text', 'text-medium')}>Заголовок</p>
          <InputGroup>
            <Input
              className='text-medium'
              placeholder='Заголовок'
            />
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          </InputGroup>
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Цена</p>
          <InputGroup>
            <Input
              className='text-medium'
              placeholder='Цена'
            />
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          </InputGroup>
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Описание</p>
          <InputGroup>
            <Textarea
              paddingRight={40}
              className='text-medium'
              placeholder='Описание'
            />
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          </InputGroup>
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Путь к картинке</p>
          <InputGroup>
            <InputLeftElement pointerEvents='none' color='gray.300'>
              <p className="text-medium">url</p>
            </InputLeftElement>
            <Input
              className='text-medium'
              placeholder='____'
            />
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          </InputGroup>
        </label>

        <ButtonGroup>
          <Button
            type="submit"
            variant='solid'
            colorScheme='blue'
            className='text-medium'
          >
            Редактировать
          </Button>
          <Button variant='ghost' colorScheme='blue' onClick={cb}>
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
