import React, { useState } from "react";
import classNames from 'classnames/bind';

import { Input, Button, ButtonGroup, InputGroup, InputRightElement, InputLeftElement, Textarea, NumberInput, NumberInputField, useToast } from '@chakra-ui/react'
import { CheckIcon,  } from '@chakra-ui/icons'
import styles from "./create-product.module.scss";
import { useForm } from "react-hook-form";
import { PATTERN_URL, VALIDATIONS_TEXTAREA } from "@src/shared/constants/validation-fields";
import { useCreateProductMutation } from "@src/redux/api/products-api-slice";
import { useAppDispatch } from "@src/redux/hooks";
import { pushProducts } from "@src/redux/slices/products-slice";
import { useRouter } from "next/navigation";
import { URL_DEFAULT_IMAGE } from "./contants";

const cx = classNames.bind(styles);

export type CreateProductForm = {
  title: string,
  cost: string,
  description: string,
  image: string,
  category: string,
}

export const CreateProduct = () => {
  const format = (val: string | number) => String(`₽ ${Number(val)}`.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 '))
  const parse = (val: string) => Number(val.replaceAll(' ', '').replace(/^₽/, ''))
  const [price, setPrice] = useState<number>(101)

  const router = useRouter();

  const [createProduct] = useCreateProductMutation();

  const toast = useToast()

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProductForm>({
    mode: "onChange",
  });

  const submitForm = (data: CreateProductForm) => {
    const {cost, ...restData} = data
    createProduct({price, ...restData})
      .unwrap()
      .then((data) => {
        dispatch(pushProducts(data))
        toast({
          title: 'Успешно создано',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push('/')
      })
      .catch((error: { data: string }) => {
        toast({
          title: error.data,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <div className={styles.container}>
      <h1 className={cx('headline1', 'title')}>Создание продукта</h1>
      <form className={styles.containerFields} onSubmit={handleSubmit(submitForm)}>
        <label>
          <p className={cx('text', 'text-medium')}>Заголовок</p>
          <InputGroup>
            <Input
              id="title"
              type='text'
              className='text-medium'
              placeholder='Введите заголовок'
              {...register("title", {required: true})}
            />
            {
              !Boolean(errors.title?.message) && watch("title")
                && (
              <InputRightElement>
                <CheckIcon color='green.500' />
              </InputRightElement>
            )}
          </InputGroup>
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Цена</p>
          <InputGroup>
            <NumberInput width='100%' min={101} max={99999999} value={format(price)} onChange={(value => setPrice(parse(value)))}>
              <NumberInputField
                pattern={undefined}
                id="price"
                className='text-medium'
                placeholder='Введите цену'
                {...register("cost")}
              />
            </NumberInput>
            {
              !Boolean(errors.cost?.message) && price
                && (
              <InputRightElement>
                <CheckIcon color='green.500' />
              </InputRightElement>
            )}
          </InputGroup>
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Категория</p>
          <InputGroup>
            <Input
              id="category"
              type='text'
              className='text-medium'
              placeholder='Введите категорию'
              {...register("category", {required: true})}
            />
            {
              !Boolean(errors.category?.message) && watch("category")
                && (
              <InputRightElement>
                <CheckIcon color='green.500' />
              </InputRightElement>
            )}
          </InputGroup>
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Путь к картинке</p>
          <InputGroup>
            <InputLeftElement pointerEvents='none' color='gray.300'>
              <p className="text-medium">url</p>
            </InputLeftElement>
            <Input
              defaultValue={URL_DEFAULT_IMAGE}
              id="image"
              type='text'
              className='text-medium'
              placeholder='Введите путь к картинке'
              {...register("image", {required: true, pattern: { ...PATTERN_URL }})}
            />
            {
              !Boolean(errors.image?.message) && watch("image")
                && (
              <InputRightElement>
                <CheckIcon color='green.500' />
              </InputRightElement>
            )}
          </InputGroup>
          {Boolean(errors.image?.message) && <p className={styles.errorText}>{errors.image?.message}</p>}
        </label>

        <label>
          <p className={cx('text', 'text-medium')}>Описание</p>
          <InputGroup>
            <Textarea
              paddingRight='40px'
              className='text-medium'
              placeholder='Описание'
              {...register("description", {
                ...VALIDATIONS_TEXTAREA,
              })}
            />
            {
              !Boolean(errors.description?.message) && watch("description")
                && (
              <InputRightElement>
                <CheckIcon color='green.500' />
              </InputRightElement>
            )}
          </InputGroup>
        </label>

        <ButtonGroup>
          <Button
            type="submit"
            variant='solid'
            colorScheme='blue'
            className='text-medium'
          >
            Создать продукт
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
