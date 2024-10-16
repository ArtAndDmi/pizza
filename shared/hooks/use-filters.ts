import {useSearchParams} from "next/navigation"
import {useMemo, useState} from "react"
import {useSet} from "react-use"

interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

interface QueryFilters extends PriceProps {
    types: string[]
    sizes: string[]
    ingredients: string[]
}

export interface Filters {
    sizes: Set<string>
    types: Set<string>
    prices: PriceProps
    selectedIngredients: Set<string>
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void
    setTypes: (type: string) => void
    setSizes: (size: string) => void
    setSelectedIngredients: (ingredient: string) => void
}


export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as Map<keyof QueryFilters, string>

    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(
        searchParams.has('ingredients') ? searchParams.get('ingredients')!.split(',') : [])
    )

    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(
        searchParams.has('sizes') ? searchParams.get('sizes')!.split(',') : [])
    )

    const [types, {toggle: toggleTypes}] = useSet(new Set<string>(
        searchParams.has('types') ? searchParams.get('types')!.split(',') : [])
    )

    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: +searchParams.get('priceFrom') || undefined,
        priceTo: +searchParams.get('priceTo') || undefined,
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const filters = {
        ...prices,
        types: Array.from(types),
        sizes: Array.from(sizes),
        ingredients: Array.from(selectedIngredients)
    }

    return useMemo(() => ({
        sizes,
        types,
        prices,
        selectedIngredients,
        setPrices: updatePrice,
        setTypes: toggleTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients
    }), [sizes, types, prices, selectedIngredients])
}