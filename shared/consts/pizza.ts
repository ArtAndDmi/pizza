export const mapPizzaSize = {
    20: 'маленькая',
    30: 'средняя',
    40: 'большая',
} as const

export const mapPizzaType = {
    1: 'традиционное',
    2: 'тонкое',
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    name,
    value
}))

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value
}))

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
