import {Ingredient, Product} from '@prisma/client'
import {axiosInstance} from './instance'
import {ApiRoutes} from './consts'

export const getAll = async () => {
    const {data} = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)
    return data.ingredients
}