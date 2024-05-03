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
              defaultValue='data:image/jpeg;base64,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'
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
