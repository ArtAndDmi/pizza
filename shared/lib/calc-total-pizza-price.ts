import {Ingredient, ProductItem} from "@prisma/client"
import {PizzaSize, PizzaType} from "@/shared/consts/pizza"


export const calcTotalPizzaPrice = (
    items: ProductItem[],
    ingredients: Ingredient[],
    type: PizzaType,
    size: PizzaSize,
    selectedIngredientsIds: Set<number>
) => {
    const pizzaPrice = items.find(item => item.pizzaType === +type && item.size === +size)?.price || 0

    const totalIngredientsPrice = ingredients.filter(ingredient => selectedIngredientsIds.has(ingredient.id)).reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    )


    return  pizzaPrice + totalIngredientsPrice
}