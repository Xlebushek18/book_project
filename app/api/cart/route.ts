import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";


// Обработчик GET-запроса для получения данных корзины пользователя
// Получает данные корзины пользователя из базы данных через Prisma и возвращает их в формате JSON.
export async function GET(req: NextRequest) {
    // Get запрос на получение данных корзины пользователя
    /*Cерверный обработчик GET-запроса в Next.js, который возвращает данные корзины пользователя из базы данных через Prisma.*/
    try {
        const token = req.cookies.get('cartToken')?.value; // Получаем токен из куки, чтобы идентифицировать пользователя
    
    if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] }); // Если токен отсутствует, возвращаем пустую корзину
    }

    /*делает запрос в базу через Prisma: 
    1. ищет корзину по токену;
    2. если корзина найдена, возвращает её данные.*/
    
    const userCart = await prisma.cart.findFirst({
        where: {
            OR:[
                {
                    token,
                },
            ]
        },
        include: {
            items: { 
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    })

    return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
      }
}

// Обработчик POST-запроса для добавления товара в корзину
export async function POST(req: NextRequest) {
    try {
      let token = req.cookies.get('cartToken')?.value;
  
      if (!token) {
        token = crypto.randomUUID();
      }
  
      const userCart = await findOrCreateCart(token);
  
      const data = (await req.json()) as CreateCartItemValues;
  
      const findCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            every: {
              id: { in: data.ingredients },
            },
          },
        },
      });

    // Если товар был найден, делаем +1
    if (findCartItem) {
        await prisma.cartItem.update({
          where: {
            id: findCartItem.id,
          },
          data: {
            quantity: findCartItem.quantity + 1,
          },
        });
      } else {
        // Если товара нет, создаем новый элемент корзины
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productItemId: data.productItemId,
            quantity: 1,
            ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
          },
        });
      }

      // Обновляем общую сумму корзины
      const updatedUserCart = await updateCartTotalAmount(token);

    // Устанавливаем токен в куки
      const resp = NextResponse.json(updatedUserCart);
      resp.cookies.set('cartToken', token);
      return resp;
    } catch (error) {
      console.log('[CART_POST] Server error', error);
      return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
    }
}