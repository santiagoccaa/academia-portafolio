import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Laptop, Lightbulb, Speech } from "lucide-react";
import Image from "next/image";
import { STUDENT_HOME } from "@/const/images";
import { Decorador } from "./Decorador";
import { CollaBoration } from "./CollaBoration";
import { Board, Career, Computer, Loader, Speaking, Thinking } from "@/components/Icons";
import { useLocale, useTranslations } from "next-intl";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

const items = [
    {
        icon: Speech,
        name: "icons.speaking",
        component: <Speaking color="#F1BF5A" size="25" />
    },
    {
        icon: BriefcaseBusiness,
        name: "icons.career",
        component: <Career color="#F4876B" size="25" />

    },
    {
        icon: Lightbulb,
        name: "icons.creative",
        component: <Thinking color="#B4708D" size="25" />

    }
]

export const Hero = () => {

    const t = useTranslations("homePage.hero")

    const lang = useLocale()
    return (
        <div className="relative bg-linear-to-t from-accent via-white to-white overflow-hidden">
            <Decorador className="top-20 lg:top-1/2 lg:-translate-y-1/2 -left-40 lg:left-0" />
            <Decorador className="bottom-20 -right-30 lg:bottom-0 lg:right-0 lg:flex" />
            {/* <ExploreCourse /> */}
            <ContentPage>
                <div className="h-fit min-h-screen flex flex-col">
                    <div className="flex flex-1 lg:min-h-screen items-center relative lg:pt-10">
                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 relative flex flex-col">
                            {/* Title */}
                            <div className="flex-1 flex flex-col justify-center">
                                <h2 className={`text-4xl md:text-6xl ${lang === "en" ? 'lg:text-7xl' : 'lg:text-5xl'} font-bold`}>
                                    {t('title.text1')} <span className="text-primary">{t('title.text2')}</span> {t('title.text3')} <span className="text-primary">{t('title.text4')}</span> {t('title.text5')} <span className="text-primary">{t('title.text6')}</span> {t('title.text7')}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-gray-600 my-4">
                                    {t('description')}
                                </p>

                                <div className="flex gap-8 mt-4">

                                    <SignOutButton>
                                        <Button size="lg" className="hover:shadow-xl" asChild>
                                            <Link href={"/academy"}>
                                                {t('buttons.freeTrial')}
                                            </Link>
                                        </Button>
                                    </SignOutButton>
                                </div>
                            </div>
                            {/* Item icons */}
                            <div className="flex justify-between mt-8 py-4">
                                {items.map(({ component, name, }, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        {component}
                                        <span className="text-sm text-gray-500">{t(name)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="w-1/2 hidden lg:flex items-center justify-center h-full">
                            <div className="relative">
                                <div className="w-8 aspect-square rounded-full bg-primary absolute left-0 bottom-10" />
                                <div className="w-4 aspect-square rounded-full bg-primary absolute left-10 bottom-0" />

                                <div className="w-100 aspect-square border border-primary rounded-full absolute bottom-4 right-4" />
                                <div className="w-100 h-100 rounded-full bg-primary relative overflow-hidden">
                                    <div className="w-70 h-80 absolute bottom-0 left-1/2 -translate-x-1/2">
                                        <Image src={STUDENT_HOME} alt="student" fill sizes="280px" />
                                    </div>
                                </div>

                                <div className="absolute top-0 -right-12 w-30 py-2 rounded-lg bg-white border border-primary shadow-2xl flex flex-col justify-end items-center gap-2">
                                    <Loader size="70" color="#20B486" />
                                    <h3 className="text-xl font-bold">5k+</h3>
                                    <span className="text-xs text-gray-400">{t('box.box1')}</span>
                                </div>

                                <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-44 py-1 px-2  rounded-lg bg-white border border-primary shadow-2xl flex items-center gap-2">
                                    <div className="p-1 rounded-lg bg-primary">
                                        <Computer size="25" color="white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">2k+</h3>
                                        <span className="text-xs text-gray-400 -mt-1">{t('box.box2')}</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 -right-4 w-fit py-1 px-2 rounded-lg bg-white border border-primary shadow-2xl flex items-center  gap-2">
                                    <div className="p-1 rounded-lg bg-primary">
                                        <Board size="25" color="white" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400">{t('box.box3')}</span>
                                        <h3 className="text-xl font-bold -mt-1">250+</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CollaBoration />
                </div>
            </ContentPage>
        </div >
    )
}
