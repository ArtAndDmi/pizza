'use client'

import React, {useState} from 'react'
import {FilterCheckbox, FilterCheckBoxProps} from "@/shared/components/shared/filter-checkbox"
import {Skeleton} from "@/shared/components/ui/skeleton"
import {Input} from "@/shared/components/ui/input"


type Item = FilterCheckBoxProps
interface Props {
    title: string
    items: Item[]
    defaultItems?: Item[]
    limit?: number
    searchInputPlaceholder?: string
    onClickCheckBox?: (id: string) => void
    defaultValue?: string[]
    selected?: Set<string>
    className?: string
    loading: boolean
    name: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    onClickCheckBox,
    defaultValue,
    loading,
    selected,
    name

}) => {
    const [showAll, setShowAll] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    if (loading) {
        return (
            <div className={className}>
                <p className={'font-bold mb-3'}>{title}</p>

                <Skeleton className={'h-6 mb-4 rounded-[8px]'}/>

                {
                    ...Array(limit - 1).fill(0).map((_ ,i) =>
                        <Skeleton className={'h-6 mb-4 rounded-[8px]'} key={i} />
                    )
                }

            </div>
        )
    }

    const list =   showAll
            ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
            : (defaultItems || items).slice(0, limit)

    return (
        <div className={className}>

            <p className={'font-bold mb-3'}>{title}</p>

            {
                showAll &&
                <div className={'mb-5'}>
                    <Input
                        placeholder={searchInputPlaceholder}
                        className={'bg-gray-50 border-none'}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </div>
            }

            <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
                {list.map((item, index) =>
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckBox?.(item.value)}
                        name={name}
                    />
                )}
            </div>

            {
                items.length > limit && (
                    <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                        <button onClick={() => setShowAll(!showAll)} className={'text-primary mt-3'}>
                            {showAll ? 'Скрыть' : '+ Показать'}
                        </button>
                    </div>
                )
            }

        </div>
    )
}

