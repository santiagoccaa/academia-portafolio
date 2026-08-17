import { FeedbackCourse } from "@/app/generated/prisma/client"
import { StarRating } from "@/components/Shared";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export interface FeedbackeProps {
    firstName: string;
    lastName: string;
    imageUrl: string;
    description: string;
    stars: number;
    createdAt: Date
}

interface FeedbackProps {
    feedback: FeedbackeProps[];
}

export const Feedback = ({ feedback }: FeedbackProps) => {
    const t = useTranslations('infoCourse')

    if (feedback.length === 0) {
        return (
            <div className="flex items-center justify-center py-4">
                <h2 className="text-lg font-light text-gray-600">No hay  opiniones sobre este curso</h2>
            </div>
        )
    }

    return (
        <div className="border rounded-md p-4">
            <h2 className='text-3xl font-semibold mb-4'>{t('opinions')}</h2>
            {feedback.map(async (item, index) => {
                return (
                    <div key={index} className="py-2 border-b space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 aspect-square rounded-full relative overflow-hidden">
                                <Image src={item.imageUrl} fill alt={item.firstName || 'teacher'} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-800 capitalize">{item.firstName} {item.lastName}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <StarRating rating={item.stars} />
                            <span className="text-xs font-light text-gray-600">{item.createdAt.toLocaleDateString()}</span>
                        </div>
                        <Accordion type="single" collapsible defaultValue="item-1" className="relative">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-left absolute bottom-full right-0 aspect-square flex items-center justify-center" />

                                <AccordionContent className="text-sm text-gray-700">
                                    {item.description}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )
            })}
        </div>
    )
}

