import React from 'react';

interface Props {
  code: string;
}

// Компонент для отображения кода подтверждения регистрации и ссылки на подтверждение пользователя
export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>
);
