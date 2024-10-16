import {useEffect, useRef} from "react"
import qs from "qs"
import {Filters} from "@/shared/hooks/use-filters"
import {useRouter} from "next/navigation"

export const useQueryFilters = (filters: Filters) => {
    const isMounted = useRef(false)
    const router = useRouter()


    useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.prices,
                types: Array.from(filters.types),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngredients)
            }

            const queryString = qs.stringify(params, {arrayFormat: 'comma'})

            router.push(`?${queryString}`, {
                scroll: false
            })
            console.log()
        }
        isMounted.current = true

    }, [filters])
}