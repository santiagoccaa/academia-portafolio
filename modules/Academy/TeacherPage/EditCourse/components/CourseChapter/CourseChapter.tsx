"use client"

import { GripVertical, ListCheck, Loader2, Pencil, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, DropResult, Draggable } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { Chapter } from "@/app/generated/prisma/client"
import { TitlePage } from "@/components/Shared"
import { FormChaterName } from "./FormChaterName"

export type CourseChapterProps ={
    idCourse: string
    chapters: Chapter[] | null
}

export const CourseChapter = ({ chapters, idCourse }: CourseChapterProps) => {

    const t = useTranslations()

    const router = useRouter()

    const [chapterList, setChapterList] = useState(chapters ?? [])
    const [showInputChapter, setShowInputChapter] = useState(false)

    useEffect(() => {
        setChapterList(chapters ?? [])
    }, [chapters])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        if (result.source.index === result.destination.index) return

        const items = Array.from(chapterList)
        const [reorderItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderItem)

        setChapterList(items)

        const bulkUpdate = items.map((chapter, index) => ({
            id: chapter.id,
            position: index
        }))

        onReorder(bulkUpdate)
    }

    const onReorder = async (updateData: { id: string, position: number }[]) => {

        try {
            await axios.put(`/api/teacher/course/${idCourse}/chapter/reorder`, {
                list: updateData
            })
        } catch (error) {
            toast.error("Algo salio mal")
        }
    }

    const onEditChapter = (chapterId: string) => {
        console.log(chapterId);
        
        // router.push(`/academy/teacher/${idCourse}/${chapterId}`)
    }

    return (
        <div className="space-y-4 h-fit relative">
            <TitlePage title={t("editCourse.courseForm.titleChapters")} icon={ListCheck} />

            <div className="flex gap-2 items-center justify-between mb-3">
                <p>{t('editCourse.courseForm.subtitle')}</p>
                <Button variant="outline" size="sm" onClick={() => setShowInputChapter(true)}>
                    <PlusCircle className="w-4 h-4" />
                    {t('editCourse.courseForm.buttonNew')}
                </Button>
            </div>

            {showInputChapter && <FormChaterName chapters={chapterList} setShowInputChapter={setShowInputChapter} setChapterList={setChapterList} idCourse={idCourse} />}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="chapters">
                    {(provider) => (
                        <div {...provider.droppableProps} ref={provider.innerRef} className="flex flex-col gap-2">
                            {
                                chapterList?.map((chapter, index) => (
                                    <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                        {(provider) => (
                                            <div
                                                ref={provider.innerRef}
                                                {...provider.draggableProps}
                                                {...provider.dragHandleProps}
                                                className="flex gap-2 items-center bg-slate-200 rounded-md py-2 px-4 text-sm justify-between"
                                            >
                                                <div className="flex gap-2 items-center">
                                                    <GripVertical className="w-4 h-4 text-gray-500" />
                                                    <p>{chapter.title}</p>
                                                </div>
                                                <div className="flex gap-2 items-center px-2 py-1">
                                                    {chapter.isPublised
                                                        ?
                                                        (
                                                            <p className="py-1 px-2 text-emerald-600">{t('common.published')}</p>
                                                        )
                                                        :
                                                        (
                                                            <p className="py-1 px-2 text-gray-700">{t('common.unpublished')}</p>
                                                        )
                                                    }
                                                    <div className="cursor-pointer" onClick={() => onEditChapter(chapter.id)}>
                                                        <Pencil className="w-4 h-4 text-gray-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
