import {Product} from '@prisma/client'
import {axiosInstance} from './instance'
import {ApiRoutes} from './consts'

export const search = async (query: string) => {
    return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: {query}}))
        .data
}