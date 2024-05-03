import React, { useEffect } from "react";
import classNames from 'classnames/bind';

import { Input, Button, ButtonGroup, InputGroup, InputRightElement, InputLeftElement, Textarea, NumberInput, NumberInputField, useToast } from '@chakra-ui/react'
import { CheckIcon,  } from '@chakra-ui/icons'
import styles from "./edit-product-form.module.scss";
import { useForm } from "react-hook-form";
import { PATTERN_URL, VALIDATIONS_TEXTAREA } from "@src/shared/constants/validation-fields";
import { GetProductItem } from "@src/shared/types/product";
import { useEditProductMutation } from "@src/redux/api/products-api-slice";
import { setProducts } from "@src/redux/slices/products-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

export type EditProductForm = {
  title: string,
  price: string,
  description: string,
  image: string,
  category: string,
}

export const EditProductForm = ({cb, product}: {cb: () => void, product: GetProductItem}) => {
  const [editProduct] = useEditProductMutation();

  const router = useRouter();

  const { products } = useAppSelector((store) => store.products);

  const toast = useToast()

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditProductForm>({
    mode: "onChange",
  });

  useEffect(() => {
      reset(
        {
          category: product.category,
          description: product.description,
          image: product.image,
          price: String(product.price),
          title: product.title
        },
        { keepDirty: true }
      );
  }, [product]);

  const submitForm = (data: EditProductForm) => {
    const {price, ...restData} = data;
    editProduct({ id: product.id, data: {price: Number(price), ...restData} })
      .unwrap()
      .then((data) => {
        const productsFilter = products?.filter((item) => item.id !== product.id) || []
        dispatch(setProducts([data, ...productsFilter]))
        toast({
          title: 'Успешно изменено',
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
            <NumberInput width='100%' defaultValue={product.price}>
              <NumberInputField
                id="price"
                className='text-medium'
                placeholder='Введите цену'
                {...register("price", {required: true})}
              />
            </NumberInput>
            {
              !Boolean(errors.price?.message) && watch("price")
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
            Редактировать
          </Button>
          <Button
            type="button"
            variant='ghost'
            colorScheme='blue'
            className='text-medium'
            onClick={cb}
          >
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
