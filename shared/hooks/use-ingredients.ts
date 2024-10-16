import {useEffect, useState} from "react"
import {Ingredient} from "@prisma/client"
import {Api} from "@/shared/services/api-client"

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const res = await Api.ingredients.getAll()
                setIngredients(res)

            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        getIngredients()
    }, [])

    return {
        ingredients,
        loading
    }
}