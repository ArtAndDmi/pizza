'use client'

import {ProductWithRelations} from '@/types/prisma'
import React from 'react'
import toast from 'react-hot-toast'
import {useCartStore} from "@/shared/store/cart"
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form"
import {ChooseProductForm} from "@/shared/components/shared/choose-product-form"

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({product, onSubmit: _onSubmit}) => {
    const addCartItem = useCartStore((state) => state.addCartItem)
    const loading = useCartStore((state) => state.loading)

    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id
            await toast.promise(
                addCartItem({
                    productItemId: itemId,
                    ingredients
                }),
                {
                    loading: 'Добавление...',
                    success: `${isPizzaForm ? 'Пицца добавлена' : 'Продукт добавлен'} в корзину`,
                    error: `Произошла ошибка при добавлении ${isPizzaForm ? 'пиццы' : 'продукта'}`,
                }
            )

            _onSubmit?.()

        } catch (e) {
            console.error(e)
        }
    }


    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
        />
    )
}