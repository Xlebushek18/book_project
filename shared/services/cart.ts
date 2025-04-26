import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import { axiosInstance } from "./instance"

// Функция для получения данных корзины пользователя
export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data;
}

// Функция для обновления количества товара в корзине
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
  };


// Функция для удаления товара из корзины
export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
};

// Функция для добавления товара в корзину
export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data;
  };