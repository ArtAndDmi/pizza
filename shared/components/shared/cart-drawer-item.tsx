import React from 'react'
import {cn} from "@/shared/lib"
import * as CartItem from './cart-item-details'
import {CartItemProps} from "@/shared/components/shared/cart-item-details/cart-item-details.types"
import {Trash2Icon} from "lucide-react"

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void
    onClickRemove?: () => void
    className?: string
}

export const CartDrawerItem: React.FC<Props> = ({
                                                    className = '',
                                                    id,
                                                    disabled,
                                                    imageUrl,
                                                    name,
                                                    price,
                                                    quantity,
                                                    details,
                                                    onClickCountButton,
                                                    onClickRemove
                                                }) => {

    return (
        <div className={cn(
            'flex bg-white p-5 gap-6 transition-all',
            {
                'opacity-50 pointer-events-none': disabled
            },
            className
        )}
        >
            <CartItem.Image src={imageUrl}/>
            <div className={'flex-1'}>
                <CartItem.Info name={name} details={details}/>

                <hr className={'my-3'}/>


                <div className={'flex items-center justify-between'}>
                    <CartItem.CountButton onClick={onClickCountButton} value={quantity}/>

                    <div className={'flex items-center gap-3'}>
                        <CartItem.Price value={price}/>
                        <Trash2Icon
                            className={'text-gray-400 cursor-pointer hover:text-gray-600'}
                            size={16}
                            onClick={onClickRemove}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

