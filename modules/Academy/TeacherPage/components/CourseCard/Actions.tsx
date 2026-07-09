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

type ActionsProps = {
    id: string
}

export const Actions = ({ id }: ActionsProps) => {

    const t = useTranslations()
    const router = useRouter()

    const onEdit = () => {
        router.push(`/academy/teacher/${id}`)
    }

    const onDelete = () => {
        axios.delete(`/api/course/${id}`)
        toast(t('alerts.alert17'))
        router.refresh()
    }

    return (
        <div className="flex flex-col gap-2 items-center w-full max-w-42">
            <Button className="w-full" onClick={onEdit}>
                {t('common.edit')} <Edit className="w-4 h-4" />
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