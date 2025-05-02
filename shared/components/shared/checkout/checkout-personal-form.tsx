import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormMaskedInput } from '../form';

interface Props {
  className?: string;
}

/// Компонент для отображения формы ввода персональных данных на странице оформления заказа
export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormMaskedInput name="phone" className="text-base"  placeholder="+7 (___) ___-__-__" mask="+7 (000) 000-00-00" />
      </div>
    </WhiteBlock>
  );
};
