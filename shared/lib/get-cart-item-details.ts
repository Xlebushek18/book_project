import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getCartItemDeteils = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingredients: Ingredient[]
): string => {
  const details = [];

  /*Детальная информация о пицце (тип теста, размер)*/
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`)
  }

  /*Дополнительно выбранные ингредиенты*/
  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
}