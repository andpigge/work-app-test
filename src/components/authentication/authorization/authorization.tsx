import React, { useState } from "react";
import classNames from 'classnames/bind';

import { Input, Button, ButtonGroup, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import {
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  SETTINGS_EMAIL,
  SETTINGS_PASSWORD,
  VALIDATIONS_EMAIL,
  VALIDATIONS_PASSWORD,
} from "@src/shared/constants/validation-fields";
import styles from "./authorization.module.scss";
import { useLoginUserMutation } from "@src/redux/api/authentication-api-slice";
import { setCookie, removeCookie } from "typescript-cookie";
import { useRouter } from "next/navigation";
import { setAuthorizing } from "@src/redux/slices/users-slice";
import { useAppDispatch } from "@src/redux/hooks";

const cx = classNames.bind(styles);

type SignInForm = {
  email: string;
  password: string;
};

export const Authorization = ({cb}: {cb: () => void}) => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const toast = useToast()

  const [show, setShow] = useState<'hide' | 'show'>('hide')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: "onChange",
  });

  const handleClickSetShow = () => setShow(show === 'hide' ? 'show' : 'hide')

  const submitForm = ({email, password}: SignInForm) => {
    loginUser({username: 'mor_2314', password: '83r5^_'})
      .unwrap()
      .then(({ token }) => {
        setCookie("access_token", token);
        dispatch(setAuthorizing(true));
        toast({
          title: 'Успешный вход',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push('/');
      })
      .catch((error: {data: string}) => {
        console.log("🚀 ~ file: registration.tsx:48 ~ onSubmit ~ error:", error);
        removeCookie("access_token");
        toast({
          title: error.data || "Аккаунт не найден",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(submitForm)}>
      <label>
        <p className={cx('text', 'text-medium')}>{SETTINGS_EMAIL.label}</p>
        <InputGroup>
          <Input
            isInvalid={Boolean(errors.email?.message)}
            errorBorderColor='red.300'
            type={SETTINGS_EMAIL.type}
            placeholder={SETTINGS_EMAIL.placeholder}
            id="email"
            className='text-medium'
            {...register("email", {
              required: VALIDATIONS_EMAIL.required,
              minLength: { ...VALIDATIONS_EMAIL.minLength },
              maxLength: { ...VALIDATIONS_EMAIL.maxLength },
              pattern: { ...PATTERN_EMAIL },
            })}
          />
          {
            !Boolean(errors.email?.message) && watch("email")
              && (
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          )}
        </InputGroup>
        {Boolean(errors.email?.message) && <p className={styles.errorText}>{errors.email?.message}</p>}
      </label>

      <label>
        <p className={cx('text', 'text-medium')}>{SETTINGS_PASSWORD.label}</p>
        <InputGroup>
          <Input
            paddingRight={!Boolean(errors.password?.message) && watch("password") ? 98 : 16 }
            isInvalid={Boolean(errors.password?.message)}
            errorBorderColor='red.300'
            placeholder={SETTINGS_PASSWORD.placeholder}
            id="password"
            className='text-medium'
            type={show === 'show' ? 'text' : 'password'}
            {...register("password", {
              required: VALIDATIONS_PASSWORD.required,
              minLength: { ...VALIDATIONS_PASSWORD.minLength },
              maxLength: { ...VALIDATIONS_PASSWORD.maxLength },
              pattern: { ...PATTERN_PASSWORD },
              validate: VALIDATIONS_PASSWORD.validate,
            })}
          />
            <InputRightElement width={!Boolean(errors.password?.message) && watch("password") ? 98 : 16 }>
              <div className={styles.containerElement}>
                <Button size='sm' onClick={handleClickSetShow}>
                  {show === 'show' ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
                {!Boolean(errors.password?.message) && watch("password")
                  && (
                  <CheckIcon color='green.500' />
                )}
            </div>
           </InputRightElement>
        </InputGroup>
        {Boolean(errors.password?.message) && <p className={styles.errorText}>{errors.password?.message}</p>}
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
