import React from 'react'
import Link from "next/link"
import {Plus} from "lucide-react"
import {Ingredient} from "@prisma/client"
import {Title} from "@/shared/components/shared/title"
import {Button} from "@/shared/components/ui/button"

interface Props {
    id: number
    name: string
    price: number
    imageUrl: string
    className?: string
    ingredients?: Ingredient[]
}

export const ProductCard: React.FC<Props> = ({
    className = '',
    id,
    name,
    price,
    imageUrl,
    ingredients
}) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
                    <img className={'w-[215px] h-[215px] hover:translate-y-1 transition-all'} src={imageUrl} alt={name}/>
                </div>

                <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'} />

                <p className={'text-sm text-gray-400'}>
                    {ingredients?.map(ingredient => ingredient.name).join(', ')}
                </p>

                <div className={'flex justify-between items-center mt-4'}>
                    <span className={'text-[20px]'}>
                        от <b>{price} ₽</b>
                    </span>

                    <Button variant={'secondary'} className={'font-bold text-base'}>
                        <Plus size={20} className={'mr-1'}/>
                        Выбрать
                    </Button>
                </div>
            </Link>
        </div>
    )
}

