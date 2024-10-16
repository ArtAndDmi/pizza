'use client'



import React from "react"
import {CartStateItem} from "@/shared/lib/get-cart-details"
import {WhiteBlock} from "@/shared/components/shared/white-block"
import {CheckoutItemSkeleton} from "@/shared/components/shared/checkout-item-skeleton"
import {CheckoutItem} from "@/shared/components/shared/checkout-item"
import {getCartItemDetails} from "@/shared/lib/get-cart-item-details"
import {PizzaSize, PizzaType} from "@/shared/consts/pizza"

interface Props {
    items: CartStateItem[]
    removeCartItem: (id: number) => void
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
    loading: boolean
    className?: string
}

export const CheckoutCart: React.FC<Props> = ({
    items,
    removeCartItem,
    onClickCountButton,
    className = '',
    loading
}) => {

    return (
        <WhiteBlock title={'1. Корзина'} className={className}>
            <div className={'flex flex-col gap-5'}>
                {
                    loading &&
                    [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index}/>)
                }

                {
                    !loading &&
                    items.map(item => (
                        <CheckoutItem
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            disabled={item.disabled}
                            onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                            onClickRemove={() => removeCartItem(item.id)}
                        />
                    ))
                }
            </div>
        </WhiteBlock>
    )
}

