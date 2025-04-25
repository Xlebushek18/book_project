import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

/*Код определяет типы данных, которые используются для описания структуры корзины и 
её элементов при работе с базой данных через Prisma (типизация) */

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
      };
      ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
    items: CartItemDTO[];
}
