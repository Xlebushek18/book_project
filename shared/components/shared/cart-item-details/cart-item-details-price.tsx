import { cn } from '@/shared/lib/utils';

interface Props {
  value: number;
  className?: string;
}

/*Рендеринца стоимсоть товара*/

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
