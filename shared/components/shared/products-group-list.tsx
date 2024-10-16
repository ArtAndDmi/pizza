'use client'

import React, {useEffect, useRef} from 'react'
import {useIntersection} from "react-use"
import {cn} from "@/shared/lib/utils"
import {useCategoryState} from "@/shared/store/category"
import {ProductWithRelations} from "@/types/prisma"
import {ProductCard} from "@/shared/components/shared/product-card"
import {Title} from "@/shared/components/shared/title"

interface Props {
    title: string
    items: ProductWithRelations[]
    categoryId: number
    className?: string
    listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({
   className = '',
    title,
    items,
    categoryId,
    listClassName = ''
}) => {
    const setActiveId = useCategoryState(state => state.setActiveId)
    const intersectionRef = useRef(null)

    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    })

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId)
        }
    }, [intersection?.isIntersecting])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            {items.length > 0 &&<Title text={title} className={'font-extrabold mb-5'} size={'lg'}/>}

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items
                        .filter(product => product.items.length > 0)
                        .map(product => (

                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.items[0].price}
                                imageUrl={product.imageUrl}
                                ingredients={product.ingredients}
                            />
                        ))
                }
            </div>
        </div>
    )
}

