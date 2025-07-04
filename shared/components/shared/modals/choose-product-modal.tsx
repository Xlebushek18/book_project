'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { ProductForm } from '../product-form';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

//модальное окно, которое открывается при нажатии на кнопку "Выбрать" в карточке товара
export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const addCartItem = useCartStore(state => state.addCartItem);
  const loading = useCartStore(state => state.loading);


  
  //Функция, которая вызывается при нажатии на кнопку "Добавить в корзину" и отправляет товар в корзину
  const onSubmit = async (productItemId?:number, ingredients?: number[]) => {
    try {

      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      
        toast.success(product.name + ' добавлена в корзину');
        router.back();
    } catch (err) {
        toast.error('Не удалось добавить товар в корзину');
        console.error(err);
    }
  }

  
  
    return (
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn(
            'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
          )}>
           <ProductForm product={product} onSubmit={() => router.back()}/>
        </DialogContent>
      </Dialog>
    )
}