import {findPizzas, GetSearchParams} from "@/shared/lib/find-pizzas"
import {Container} from "@/shared/components/shared/container"
import {Title} from "@/shared/components/shared/title"
import {TopBar} from "@/shared/components/shared/top-bar"
import {Suspense} from "react"
import {Filters} from "@/shared/components/shared/filters"
import {ProductsGroupList} from "@/shared/components/shared/products-group-list"

export default async function Home(
    {searchParams} : { searchParams: GetSearchParams }
) {
    const categories = await findPizzas(searchParams)


    return (
        <>
            <Container className={'mt-10'}>
                <Title text={'Все товары'} size={'lg'} className={'font-extrabold'}/>
            </Container>

            <TopBar categories={categories.filter(cat => cat.products.length > 0)}/>
            <Container className={'pb-14 mt-10'}>
                <div className={'flex gap-[80px]'}>
                    <div className={'w-[250px]'}>
                        <Suspense>
                            <Filters/>
                        </Suspense>
                    </div>

                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            {
                                categories.map(category => (
                                    <ProductsGroupList
                                        title={category.name}
                                        key={category.id}
                                        items={category.products}
                                        categoryId={category.name}
                                    />
                                ))
                            }



                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}
