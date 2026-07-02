"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import axios from "axios"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface NameSlug {
    title: string
    slug: string
}

export const Search = () => {

    const router = useRouter()
    const t = useTranslations()

    const [names, setNames] = useState<NameSlug[]>([{
        title: t('common.loading'),
        slug: "/"
    }])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getNames = async () => {
            try {
                const res = await axios.get('/api/searchCourses')
                setNames(res.data)
            } finally {
                setLoading(false)
            }
        }
        getNames()
    }, [])

    return (
        <Combobox>
            <ComboboxInput placeholder={t('academy.searchHome')} className="w-70 bg-white" />
            {!loading &&
                <ComboboxContent>
                    {!names && <ComboboxEmpty>{t('academy.notFound')}</ComboboxEmpty>}
                    <ComboboxList>
                        {names.map(({ slug, title }, index) => (
                            <ComboboxItem
                                key={index}
                                value={title}
                                onClick={() => {
                                    router.push(`/academy/courses/${slug}`)
                                }}
                            >
                                {title}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            }
        </Combobox >
    )
}
