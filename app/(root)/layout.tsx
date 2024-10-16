import {Metadata} from "next"
import {Header} from "@/shared/components/shared/header"

export const metadata: Metadata = {
    title: "Pizza | Главная"
}


export default function MainLayout(
    {children, modal}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>
) {
    return (
        <main className={'min-h-screen'}>
            <Header/>
            {children}
            {modal}
        </main>
    )
}