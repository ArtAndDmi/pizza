'use client'

import React from 'react'
import {cn} from "@/shared/lib/utils"
import {useCategoryState} from "@/shared/store/category"
import {Category} from "@prisma/client"

interface Props {
    items: Category[]
    className?: string
}


export const Categories: React.FC<Props> = ({className = '', items}) => {
    const activeIndex = useCategoryState(state => state.activeId)


    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
                items.map((cat) =>
                    <a
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            activeIndex === cat.name && 'bg-white shadow-md shadow-gray-200 text-primary'
                        )}
                        href={`#${cat.name}`}
                        key={cat.id}>
                        <button>
                            {cat.name}
                        </button>
                    </a>
                )
            }
        </div>
    )
}


