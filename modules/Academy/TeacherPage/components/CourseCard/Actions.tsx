"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useCourse } from "@/store"

type ActionsProps = {
    id: string
}

export const Actions = ({ id }: ActionsProps) => {

    const t = useTranslations()
    const { removeCourseBySlug } = useCourse()

    const onDelete = () => {

        removeCourseBySlug(id)
        try {
            axios.delete(`/api/teacher/course/${id}`)
            toast(t('alerts.alert17'))

        } catch (error) {
            toast('No se pudo eliminar este curso')
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center w-full max-w-42">
            <Button className="w-full" asChild>
                <Link href={`/academy/teacher/${id}`}>
                    {t('common.edit')} <Edit className="w-4 h-4" />
                </Link>
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500">{t('common.delete')} <Trash className="w-4 h-4" /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('modal.deleteCourse.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('modal.deleteCourse.message')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>{t('common.delete')}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Actions