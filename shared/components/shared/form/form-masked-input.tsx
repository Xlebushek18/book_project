'use client';

import { IMaskInput } from 'react-imask';
import { useFormContext, Controller } from 'react-hook-form';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  mask: string;
}

export const FormMaskedInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  placeholder,
  mask,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <IMaskInput
            {...field}
            mask={mask}
            placeholder={placeholder}
            className="h-12 px-3 w-full rounded-md border border-gray-300 text-md"
          />
        )}
      />
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
