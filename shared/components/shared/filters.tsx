'use client'

import React from 'react'
import {useIngredients} from "@/shared/hooks/use-ingredients"
import {useFilters} from "@/shared/hooks/use-filters"
import {useQueryFilters} from "@/shared/hooks/use-query-filters"
import {Title} from "@/shared/components/shared/title"
import {CheckboxFiltersGroup} from "@/shared/components/shared/checkbox-filters-group"
import {Input} from "@/shared/components/ui/input"
import {RangeSlider} from "@/shared/components/ui/range-slider"

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className = ''}) => {
    const {ingredients, loading} = useIngredients()
    const filters = useFilters()
    useQueryFilters(filters)

    const ingredientsList = ingredients.map(i => ({text: i.name, value: String(i.id)}))

    const updatePrices = (priceFrom: number, priceTo: number) => {
        filters.setPrices('priceFrom', priceFrom)
        filters.setPrices('priceTo', priceTo)
    }

    return (
        <div className={className}>
            <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'}/>

            <CheckboxFiltersGroup
                name={'types'}
                limit={2}
                title={'Тип теста'}
                className={'mt-5'}
                onClickCheckBox={filters.setTypes}
                selected={filters.types}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}
                loading={loading}
            />

            <CheckboxFiltersGroup
                name={'sizes'}
                title={'Размеры'}
                className={'mt-5'}
                onClickCheckBox={filters.setSizes}
                selected={filters.sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
                limit={3}

                loading={loading}
            />

            <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Цена от и до:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input
                        type={'number'}
                        placeholder={'0'}
                        min={0}
                        max={1000}
                        value={String(filters.prices.priceFrom)}
                        onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type={'number'}
                        placeholder={'1000'}
                        min={0} max={1000}
                        value={String(filters.prices.priceTo)}
                        onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                    />

                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => updatePrices(priceFrom, priceTo)}/>
            </div>

            <div>
                <CheckboxFiltersGroup
                    name={'ingredients'}
                    title={'Ингридиенты'}
                    className={'mt-5'}
                    limit={6}
                    defaultItems={ingredientsList.slice(0, 6)}
                    items={ingredientsList}
                    loading={loading}
                    onClickCheckBox={filters.setSelectedIngredients}
                    selected={filters.selectedIngredients}
                />
            </div>
        </div>
    )
}

