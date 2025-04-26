'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Dialog, DialogContent } from '../../ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

//модальное окно, которое открывается при нажатии на кнопку "Выбрать" в карточке товара
export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    })
  }
  
  //запрос на добавление новой пиццы в корзину с выбранными ингредиентами
  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      })
      toast.success('Пицца добавлена в корзину');
    } catch (err) {
      toast.error('Не удалось добавить пиццу в корзину');
      console.error(err);
      
    }
  };

  
  
    return (
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', 
          className,
          )}>
            {isPizzaForm ? (
              <ChoosePizzaForm 
                imageUrl={product.imageUrl} 
                name={product.name} 
                ingredients={product.ingredients} 
                items={product.items}
                onSubmit={onAddPizza}
                loading={loading}
              />
            ) : (
              <ChooseProductForm 
                imageUrl={product.imageUrl} 
                name={product.name}
                onSubmit={onAddProduct}
                price={firstItem.price}
                loading={loading}
              />
            )}
        </DialogContent>
      </Dialog>
    )
}