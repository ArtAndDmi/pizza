'use client'

import React from 'react'
import {cn, getPizzaDetails} from "@/shared/lib"
import {PizzaSize, PizzaType, pizzaTypes} from "@/shared/consts/pizza"
import {Ingredient, ProductItem} from "@prisma/client"
import {usePizzaOptions} from "@/shared/hooks/use-pizza-options"
import {ProductImage} from "@/shared/components/shared/product-image"
import {Title} from "@radix-ui/react-dialog"
import {GroupVariants} from "@/shared/components/shared/group-variants"
import {IngredientItem} from "@/shared/components/shared/ingredient-item"
import {Button} from "@/shared/components/ui/button"

interface Props {
    imageUrl: string
    name: string
    ingredients: Ingredient[]
    items: ProductItem[]
    onSubmit: (itemId: number, ingredients: number[]) => void,
    loading?: boolean
    className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
    className = '',
    name,
    ingredients,
    items,
    onSubmit,
    imageUrl,
    loading
}) => {

    const {
        size,
        type,
        availableSizes,
        selectedIngredients,
        currentItemId,
        setSize,
        setType,
        addIngredient
    } = usePizzaOptions(items)

    const {pizzaDetails, totalPrice} = getPizzaDetails(size, type, items, ingredients, selectedIngredients)

    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients))
        }
    }

    return (
        <div className={cn('flex flex-1', className)}>
            <ProductImage src={imageUrl} size={size}/>

            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold mb-1'}/>

                <p className={'text-gray-400'}>{pizzaDetails}</p>

                <div className={'flex flex-col gap-4 mt-5'}>
                    <GroupVariants
                        items={availableSizes}
                        value={String(size)}
                        onClick={value => setSize(value as PizzaSize)}
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={value => setType(value as PizzaType)}
                    />
                </div>

                <div className={'p-1 rounded-md mt-5 h-[350px] scrollbar overflow-auto'}>
                    <div className={'grid grid-cols-3 gap-3'}>
                        {ingredients.map(ingredient => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>


                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}

