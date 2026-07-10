"use client"

import { Chapter } from '@/app/generated/prisma/client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface PurchaseButtonsProps {
    purchase: boolean
    slug: string
    chapters: Chapter[]
    price: string | null
    id: string
    userIdCourse: string
}

export const PurchaseButtons = ({ purchase, slug, chapters, price, id, userIdCourse }: PurchaseButtonsProps) => {

    console.log("Id del curso:", id);
    
    const t = useTranslations('infoCourse')

    const { userId } = useAuth()

    const router = useRouter()

    const [isLoading, setIsloading] = useState(false)

    const enrollCourse = async () => {

        setIsloading(true)
        if (price === 'Gratis') {
            try {
                await axios.post(`/api/course/${id}/enroll`)
                router.push(`/academy/courses/${slug}/${chapters[0].id}`)
                toast(t('alerts.alert5'))
            } catch (error) {
                toast.error(t('alerts.error'))
            } finally {
                setIsloading(false)
            }
        } else {
            try {
                const res = await axios.post(`/api/course/${id}/checkout`)
                window.location.assign(res.data.message)
            } catch (error) {
                toast.error(t('alerts.alert4'))
            } finally {
                setIsloading(false)
            }
        }
    }

    const autor = userId === userIdCourse

    return (
        <>
            {
                purchase || autor ? (
                    <Button
                        className='hover:bg-primary text-white font-semibold'
                        asChild
                    >
                        <Link href={`/academy/courses/${slug}/${chapters[0].id}`}>
                            {t('viewCourse')}
                        </Link>
                    </Button>
                ) : (

                    <Button
                        className='hover:bg-primary text-white font-semibold'
                        disabled={isLoading}
                        onClick={enrollCourse}
                    >
                        {t('enroll')}
                    </Button>
                )
            }

        </>
    )

}
