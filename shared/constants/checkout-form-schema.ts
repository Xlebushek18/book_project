import { z } from 'zod';

/* Схема валидации формы оформления заказа с помощью библиотеки zod. Он задаёт правила для полей формы 
(имя, фамилия, email, телефон, адрес, комментарий), включая минимальные длины и формат email. 
Также создаётся тип CheckoutFormValues, автоматически выведенный из этой схемы, для типизации значений формы.*/

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;