import { CartItemDTO } from "../services/dto/cart.dto";

/**
 * Функция для вычисления общей стоимости товара в корзине
 * @param item - объект товара из корзины
 * @param item.productItem.price - цена товара
 * @param item.ingredients - массив ингредиентов товара, суммарной стоимости
 * @param item.quantity - количество товара в корзине
 * @returns общая стоимость товара с учетом количества и цены ингредиентов
 */

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

    return (ingredientsPrice + item.productItem.price) * item.quantity;
}