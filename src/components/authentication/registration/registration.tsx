import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import { useAppDispatch } from "@src/redux/hooks";

import { Input, Button, ButtonGroup, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from "./registration.module.scss";
import { useForm } from "react-hook-form";
import {
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  SETTINGS_EMAIL,
  SETTINGS_PASSWORD,
  VALIDATIONS_EMAIL,
  VALIDATIONS_PASSWORD,
  SETTINGS_REPEAT_PASSWORD,
} from "@src/shared/constants/validation-fields";
import { useRegisterUserMutation } from "@src/redux/api/authentication-api-slice";
import { saveUserId } from "@src/redux/slices/users-slice";

const cx = classNames.bind(styles);

type RegistrationForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const Registration = ({cb}: {cb: () => void}) => {
  const [registerUser] = useRegisterUserMutation();

  const dispatch = useAppDispatch();
  const toast = useToast()

  const [showPassword, setShowPassword] = useState<'hide' | 'show'>('hide')
  const [showRepeatPassword, setRepeatPasswordShow] = useState<'hide' | 'show'>('hide')

  const handleClickShowPassword = () => setShowPassword(showPassword === 'hide' ? 'show' : 'hide')
  const handleClickShowRepeatPassword = () => setRepeatPasswordShow(showRepeatPassword === 'hide' ? 'show' : 'hide')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegistrationForm>({
    mode: "onChange",
  });

  const password = watch("password");
  const repeatPassword = watch("repeatPassword");
  useEffect(() => {
    if (password || repeatPassword) {
      trigger("password");
      trigger("repeatPassword");
    }
  }, [password, repeatPassword, trigger]);

  const submitForm = (data: RegistrationForm) => {
    const {repeatPassword, ...restData} = data

    registerUser(restData)
      .unwrap()
      .then((data: {id: number}) => {
        dispatch(saveUserId(data.id));
        toast({
          title: 'Успешная регистрация',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        cb();
      })
      .catch((error: string) => {
        console.log("🚀 ~ file: registration.tsx:48 ~ onSubmit ~ error:", error);
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
            paddingRight={!Boolean(errors.password?.message) && password ? 98 : 16 }
            isInvalid={Boolean(errors.password?.message)}
            errorBorderColor='red.300'
            placeholder={SETTINGS_PASSWORD.placeholder}
            id="password"
            className='text-medium'
            type={showPassword === 'show' ? 'text' : 'password'}
            {...register("password", {
              required: {
                value: true || Boolean(repeatPassword),
                message: VALIDATIONS_PASSWORD.required,
              },
              minLength: { ...VALIDATIONS_PASSWORD.minLength },
              maxLength: { ...VALIDATIONS_PASSWORD.maxLength },
              pattern: { ...PATTERN_PASSWORD },
              validate: VALIDATIONS_PASSWORD.validate,
            })}
          />
            <InputRightElement width={!Boolean(errors.password?.message) && password ? 98 : 16 }>
              <div className={styles.containerElement}>
                <Button size='sm' onClick={handleClickShowPassword}>
                  {showPassword === 'show' ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
                {!Boolean(errors.password?.message) && password
                  && (
                  <CheckIcon color='green.500' />
                )}
            </div>
           </InputRightElement>
        </InputGroup>
        {Boolean(errors.password?.message) && <p className={styles.errorText}>{errors.password?.message}</p>}
      </label>

      <label>
        <p className={cx('text', 'text-medium')}>{SETTINGS_REPEAT_PASSWORD.label}</p>
        <InputGroup>
          <Input
            paddingRight={!Boolean(errors.repeatPassword?.message) && repeatPassword ? 98 : 16 }
            isInvalid={Boolean(errors.repeatPassword?.message)}
            errorBorderColor='red.300'
            placeholder={SETTINGS_REPEAT_PASSWORD.placeholder}
            id="repeatPassword"
            className='text-medium'
            type={showRepeatPassword === 'show' ? 'text' : 'password'}
            {...register("repeatPassword", {
              required: {
                value: true || Boolean(password),
                message: VALIDATIONS_PASSWORD.required,
              },
              minLength: { ...VALIDATIONS_PASSWORD.minLength },
              maxLength: { ...VALIDATIONS_PASSWORD.maxLength },
              pattern: { ...PATTERN_PASSWORD },
              validate: {
                passwordMatches: (value = "") => {
                  if (value.length && value !== password) {
                    return "Пароли не совпадают";
                  }
                },
                ...VALIDATIONS_PASSWORD.validate,
              },
            })}
          />
            <InputRightElement width={!Boolean(errors.repeatPassword?.message) && repeatPassword ? 98 : 16 }>
              <div className={styles.containerElement}>
                <Button size='sm' onClick={handleClickShowRepeatPassword}>
                  {showRepeatPassword === 'show' ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
                {!Boolean(errors.repeatPassword?.message) && repeatPassword
                  && (
                  <CheckIcon color='green.500' />
                )}
            </div>
           </InputRightElement>
        </InputGroup>
        {Boolean(errors.repeatPassword?.message) && <p className={styles.errorText}>{errors.repeatPassword?.message}</p>}
      </label>

      <ButtonGroup spacing='2'>
        <Button
          type="submit"
          variant='solid'
          colorScheme='blue'
          className='text-medium'
        >
          Зарегистрироваться
        </Button>
        <Button
          onClick={cb}
          type="button"
          variant='ghost'
          colorScheme='blue'
          className='text-medium'
        >
          Вход
        </Button>
      </ButtonGroup>
    </form>
  )
}
