import {prisma} from "@/prisma/prisma-client"
import {notFound} from "next/navigation"
import {ChooseProductModal} from "@/shared/components/shared/modals/choose-product-modal"

const ProductModalPage = async ({params: {id}}: { params: { id: string } }) => {
    const product = await prisma.product.findFirst({
        where: {
            id: +id
        },
        include: {
            ingredients: true,
            items: true
        }
    })

    if (!product) {
        return notFound()
    }


    return (
        <ChooseProductModal product={product} />
    )
}

export default ProductModalPage