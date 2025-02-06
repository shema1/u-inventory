import { Rule } from "antd/es/form"


export const requireFielddRule = { required: true, message: "Обов'язкове поле!" }
export const validEmaildRule = { type: 'email', message: "Введіть коректний емейл!" } as Rule;
export const passswordMinLengthdRule = {min: 6, message: "Пароль має містити мінімум 6 символів" }



