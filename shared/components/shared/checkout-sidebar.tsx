import React from 'react'
import {ArrowRight, Package, Percent, Truck} from "lucide-react"
import {WhiteBlock} from "@/shared/components/shared/white-block"
import {Skeleton} from "@/shared/components/ui/skeleton"
import {CheckoutItemDetails} from "@/shared/components/shared/checkout-item-details"
import {Button} from "@/shared/components/ui/button"

interface Props {
    submitting: boolean
    totalAmount: number
    loading?: boolean
}

const VAT = 15
const DELIVERY_PRICE = 250

export const CheckoutSidebar: React.FC<Props> = ({totalAmount, loading, submitting}) => {


    const vatPrice = totalAmount * VAT / 100

    return (
        <WhiteBlock className={'p-6 sticky top-4'}>
            <div className={'flex flex-col gap-1'}>
                <span className={'text-xl'}>Итого:</span>
                {
                    loading
                        ? <Skeleton className={'w-48 h-11'}/>
                        : <span className={'h-11 text-[34px] font-extrabold'}>{(totalAmount + vatPrice + DELIVERY_PRICE).toFixed(2)} ₽</span>

                }
            </div>

            <CheckoutItemDetails
                title={
                    <div className={'flex items-center'}>
                        <Package size={18} className={'mr-2 text-gray-300'} />
                        Стоимость корзины:
                    </div>
                }
                value={loading ? <Skeleton className={'h-6 w-16 rounded-sm'}/> : `${totalAmount} ₽`}
            />
            <CheckoutItemDetails
                title={
                    <div className={'flex items-center'}>
                        <Percent size={18} className={'mr-2 text-gray-300'} />
                        Налог:
                    </div>
                }
                value={loading ? <Skeleton className={'h-6 w-16 rounded-sm'}/> : `${vatPrice.toFixed(2)} ₽`}
            />
            <CheckoutItemDetails
                title={
                    <div className={'flex items-center'}>
                        <Truck size={18} className={'mr-2 text-gray-300'} />
                        Доставка:
                    </div>
                }
                value={loading ? <Skeleton className={'h-6 w-16 rounded-sm'}/> : `${DELIVERY_PRICE} ₽`}
            />
            <Button loading={submitting} type={'submit'} className={'w-full h-14 rounded-2xl mt-6 text-base font-bold'}>
                Оформить заказ
                <ArrowRight className={'w-5 ml-2'} />

            </Button>
        </WhiteBlock>
    )
}

