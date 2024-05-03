const pattern =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

export const PATTERN_EMAIL = {
  message: "Указан некорректный адрес электронной почты",
  value: RegExp("^[a-zA-Z0-9\\-._]+@[a-zA-Z0-9\\-._]+\\.[a-zA-Z0-9\\-._]+$"),
};

export const PATTERN_PASSWORD = {
  message: "Указан недопустимый символ",
  value: RegExp("^[а-яёА-ЯЁa-zA-Z0-9~!?@#$%^&*_\\-+()\\[\\]{}></\\|\"\\'.,:]*$"),
};

export const PATTERN_URL = {
  message: "Указан недопустимый адрес картинки",
  value: RegExp(pattern),
};

export const SETTINGS_EMAIL = {
  label: "E-mail",
  placeholder: "Введите свою почту",
  type: "text",
};

export const SETTINGS_PASSWORD = {
  label: "Пароль",
  placeholder: "Введите пароль",
  type: "password",
};

export const SETTINGS_REPEAT_PASSWORD = {
  label: "Повторите пароль",
  placeholder: "Введите пароль",
  type: "password",
};

export const VALIDATIONS_EMAIL = {
  minLength: {
    message: "Длина адреса электронной почты не менее 8 символов",
    value: 6,
  },
  maxLength: {
    message: "Длина адреса электронной почты не более 40 символов",
    value: 50,
  },
  required: "Поле должно быть заполнено",
};

export const VALIDATIONS_PASSWORD = {
  minLength: {
    message: "Длина пароля не менее 8 символов",
    value: 8,
  },
  maxLength: {
    message: "Длина пароля не более 64 символов",
    value: 64,
  },
  required: "Поле должно быть заполнено",
  validate: {
    onlyLatinLetter: (value = "") => {
      if (value.length && /[а-яёА-ЯЁ]/.test(value)) {
        return "Только английские буквы алфавита";
      }
    },
    hasOneDigit: (value = "") => {
      if (value.length && !/\d+/.test(value)) {
        return "Пароль должен содержать минимум 1 цифру";
      }
    },
  },
};

export const VALIDATIONS_TEXTAREA = {
  required: "Сообщение не может быть пустым",
  maxLength: {
    message: "Текст привышает максимальную допустимую длинну в 1500 символов",
    value: 1500,
  },
};
