import {axiosInstance} from "@/shared/services/instance"
import {CartDto, CreateCartItemValues} from "@/shared/services/dto/cart.dto"

export const getCart = async () => {
    return (await axiosInstance.get<CartDto>('/cart')).data
}

export const updateItemQuantity = async (itemId: number, quantity: number) => {
    return (await axiosInstance.patch<CartDto>('/cart/' + itemId, {quantity})).data
}

export const removeCartItem = async (id: number) => {
    return (await axiosInstance.delete<CartDto>('/cart/' + id)).data
}

export const addCartItem = async (values: CreateCartItemValues) => {
    return (await axiosInstance.post<CartDto>('/cart', values)).data
}