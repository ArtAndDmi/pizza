'use client'

import {useCart} from "@/shared/hooks/useCart"
import {useState} from "react"
import {FormProvider, useForm} from "react-hook-form"
import {checkoutFormSchema, CheckoutFormValues} from "@/shared/consts/checkout-form-schema"
import {zodResolver} from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import {createOrder} from "@/app/actions"
import {Container} from "@/shared/components/shared/container"
import {Title} from "@/shared/components/shared/title"
import {CheckoutCart} from "@/shared/components/shared/checkout/checkout-cart"
import {CheckoutPersonalForm} from "@/shared/components/shared/checkout/checkout-personal-form"
import {CheckoutAddressForm} from "@/shared/components/shared/checkout/checkout-address-form"
import {CheckoutSidebar} from "@/shared/components/shared/checkout-sidebar"

export const Page = () => {
    const {items, totalAmount, loading, removeCartItem, updateItemQuantity} = useCart()
    const [submitting, setSubmitting] = useState(false)


    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: ''
        }
    })

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await toast.promise(
                createOrder(data),
                {
                    loading: 'Оформление...',
                    success: `Заказ успешно оформлен! `,
                    error: `Не удалось создать заказ`,
                }
            )

            if (url) {
                location.href = url
            }

        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false)
        }
    }
    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }


    return (
        <Container>
            <Title text={'Оформление заказа'} className={'font-extrabold my-8 text-[36px]'}/>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'flex gap-10'}>
                        <div className={'flex flex-col gap-10 flex-1 mb-20'}>
                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? 'opacity-50 pointer-events-none' : ''}/>

                            <CheckoutAddressForm className={loading ? 'opacity-50 pointer-events-none' : ''}/>
                        </div>

                        <div>
                            <div className={'w-[450px]'}>
                                <CheckoutSidebar
                                    submitting={submitting}
                                    totalAmount={totalAmount}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>


        </Container>
    )
}

export default Page
