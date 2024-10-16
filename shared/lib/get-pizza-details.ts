import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/consts/pizza"
import {calcTotalPizzaPrice} from "@/shared/lib/calc-total-pizza-price"
import {Ingredient, ProductItem} from "@prisma/client"

export const getPizzaDetails = (
    size: PizzaSize,
    type: PizzaType,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {

    const pizzaDetails = `${size} см, ${mapPizzaType[type]} тесто`

    const totalPrice = calcTotalPizzaPrice(
        items,
        ingredients,
        type,
        size,
        selectedIngredients
    )

    return {
        pizzaDetails,
        totalPrice
    }
}