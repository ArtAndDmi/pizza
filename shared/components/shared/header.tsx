'use client'

import React, {useEffect, useState} from 'react'
import {cn} from "@/shared/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {useSearchParams} from "next/navigation"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import {Container} from "@/shared/components/shared/container"
import {SearchInput} from "@/shared/components/shared/search-input"
import {AuthModal} from "@/shared/components/shared/modals/auth-modal/auth-modal"
import {ProfileButton} from "@/shared/components/shared/profile-button"
import {CartButton} from "@/shared/components/shared/cart-button"


interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

export const Header: React.FC<Props> = ({className = '', hasCart = true, hasSearch = true}) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        let toastMessage = ''


        if (searchParams.has('verified')) {
            toastMessage = 'Аккаунт подтвержден'
        }

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ оплачен'
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/')
                toast.success(toastMessage, {
                    duration: 3000,
                })
            }, 500)
        }
    }, [])

    return (
        <header className={cn('border border-b', className)}>

            <Container className={'flex items-center justify-between py-8'}>
                <Link href={'/'}>
                    <div className={'flex items-center gap-4'}>
                        <Image src={'/logo.png'} alt={'Logo'} width={35} height={35}/>
                        <div>
                            <h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
                            <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>


                {
                    hasSearch &&
                    <div className={'mx-10 flex-1'}>
                        <SearchInput/>
                    </div>
                }


                <div className={'flex items-center gap-3'}>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

                    {
                        hasCart &&
                        <CartButton/>
                    }
                </div>
            </Container>
        </header>
    )
}


