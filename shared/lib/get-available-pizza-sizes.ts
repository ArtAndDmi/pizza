import {pizzaSizes} from "@/shared/consts/pizza"
import {ProductItem} from "@prisma/client"
import {Variant} from "@/shared/components/shared/group-variants"

export const getAvailablePizzaSizes = (
    items: ProductItem[],
    type: number
): Variant[] => {
    const filteredPizzasByType = items.filter(item => +item.pizzaType === +type)

    return pizzaSizes.map(item => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(pizza => +pizza.size === +item.value)
    }))
}