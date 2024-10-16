import {useEffect} from "react"
import {useCartStore} from "@/shared/store/cart"

export const useCart = () => {
    const cartState = useCartStore(state => state)

    useEffect(() => {
        cartState.fetchCartItems()
    }, [])

    return cartState
}