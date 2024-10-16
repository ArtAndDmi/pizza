'use client'

import React from 'react'
import {ArrowRight, ShoppingCart} from "lucide-react"
import {cn} from "@/shared/lib"
import {useCartStore} from "@/shared/store/cart"
import {CartDrawer} from "@/shared/components/shared/cart-drawer"
import {Button} from "@/shared/components/ui/button"

interface Props {
    className?: string
}

export const CartButton: React.FC<Props> = ({className = ''}) => {
    const loading = useCartStore(state => state.loading)
    const totalAmount = useCartStore(state => state.totalAmount)
    const itemsCount = useCartStore(state => state.items.length)
    return (
        <CartDrawer>
            <Button loading={loading} className={cn('group relative', {'w-[105px]': loading}, className)}>
                <b>{totalAmount} ₽</b>
                <span className={"h-full w-[1px] bg-white/30 mx-3"}></span>
                <div className={'flex items-center gap-1 transition duration-300 group-hover:opacity-0'}>
                    <ShoppingCart size={16} className={'relative'} strokeWidth={2}/>
                    <b>{itemsCount}</b>
                </div>
                <ArrowRight
                    size={20}
                    className={'absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}
                />
            </Button>
        </CartDrawer>
    )
}

