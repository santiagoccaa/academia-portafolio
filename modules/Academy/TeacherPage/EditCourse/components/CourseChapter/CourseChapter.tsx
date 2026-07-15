"use client"

import { GripVertical, ListCheck, Pencil, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, DropResult, Draggable } from "@hello-pangea/dnd"
import axios from "axios"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { Chapter } from "@/app/generated/prisma/client"
import { TitlePage } from "@/components/Shared"
import { FormChaterName } from "./FormChaterName"
import Link from "next/link"
import { useCourse } from "@/store"

export type CourseChapterProps = {
    courseSlug: string
}

export const CourseChapter = ({ courseSlug }: CourseChapterProps) => {

    const t = useTranslations()

    const { chaptersByCourse, getChaptersByCourse } = useCourse()

    const [showInputChapter, setShowInputChapter] = useState(false)
    const [pendingOrder, setPendingOrder] = useState<
        { id: string; position: number }[] | null
    >(null);

    useEffect(() => {
        if (!pendingOrder) return;

        const timer = setTimeout(() => {
            onReorder(pendingOrder);
        }, 2000);

        return () => clearTimeout(timer);
    }, [pendingOrder]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        if (result.source.index === result.destination.index) return;

        const items = Array.from(chaptersByCourse);

        const [removed] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, removed);

        getChaptersByCourse(items);

        setPendingOrder(
            items.map((chapter, index) => ({
                id: chapter.id,
                position: index,
            }))
        );
    };

    const onReorder = async (updateData: { id: string, position: number }[]) => {

        try {
            await axios.put(`/api/teacher/course/${courseSlug}/chapter/reorder`, {
                list: updateData
            })
        } catch (error) {
            toast.error("Algo salio mal")
        }
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

            {showInputChapter && (
                <FormChaterName
                    setShowInputChapter={setShowInputChapter}
                    courseSlug={courseSlug}
                />)
            }

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="chapters">
                    {(provider) => (
                        <div {...provider.droppableProps} ref={provider.innerRef} className="flex flex-col gap-2">
                            {
                                chaptersByCourse?.map((chapter, index) => (
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
                                                    <Link href={`/academy/teacher/${courseSlug}/${chapter.slug}`}>
                                                        <Pencil className="w-4 h-4 text-gray-500" />
                                                    </Link>
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
