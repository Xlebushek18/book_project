import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

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