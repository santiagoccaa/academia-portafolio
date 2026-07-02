import { ReactNode } from "react"
import { Graph, Mockup } from "@/components/Icons"
import { Html } from "@/components/Icons/Html"
import { useTranslations } from "next-intl"
import { ContentPage } from "@/components/ContentPage"
import { CardServices } from "./CardServices"

export interface AcademyService {
    title: string
    description: string
    icon: ReactNode
    href: string
    color: string
}

const academyServices: AcademyService[] = [
    {
        title: "card1.title",
        description: "card1.description",
        icon: <Mockup size="30" color="#4AC8AE" />,
        href: "/",
        color: "bg-accent"
    },
    {
        title: "card2.title",
        description: "card2.description",
        icon: <Html size="30" color="#4883FF" />,
        href: "/",
        color: "bg-[#E0EAFF]"
    },
    {
        title: "card3.title",
        description: "card3.description",
        icon: <Graph size="30" color="#C11574" />,
        href: "/",
        color: "bg-[#FCE7F6]"
    },
]

export const Services = () => {
    const t = useTranslations('homePage.services')
    return (
        <ContentPage>
            <div className='flex flex-col items-center text-center my-8 '>
                <h2 className='text-sm font-medium text-primary'>{t('title')}</h2>
                <p className='text-2xl md:text-3xl font-medium text-gray-800 max-w-xl mb-8'>
                    {t('subtitle')}
                </p>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'>
                    {academyServices.map((service, index) => (
                        <CardServices key={index} {...service} />
                    ))}
                </div>
            </div>
        </ContentPage>
    )
}

