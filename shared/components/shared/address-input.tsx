'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="205c26e7fa2ed9948aca01adc00dbdd39dd118f5"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
