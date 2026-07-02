"use client"

import { LOGO } from '@/const/images'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ABOUT_US, CONTACT_US, HOME } from "@/const/routes"
import { IoLogoDribbble, IoLogoFacebook, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io'
import { ContentPage } from '@/components/ContentPage'

const products = [
    {
        name: "Overview",
        url: "/"
    },
    {
        name: "Features",
        url: "/"
    },
    {
        name: "Solutions",
        url: "/"
    },
    {
        name: "Tutorials",
        url: "/"
    },
    {
        name: "Pricing",
        url: "/"
    },
]

const companies = [
    {
        name: "About us",
        url: "/"
    },
    {
        name: "Careers",
        url: "/"
    },
    {
        name: "Careers",
        url: "/"
    },
    {
        name: "News",
        url: "/"
    },
]

const social = [
    {
        name: "Twitter",
        url: "/"
    },
    {
        name: "LinkedIn",
        url: "/"
    },
    {
        name: "GitHub",
        url: "/"
    },
    {
        name: "Dribbble",
        url: "/"
    },
]

const legal = [
    {
        name: "Terms",
        url: "/"
    },
    {
        name: "Privacy",
        url: "/"
    },
    {
        name: "Cookies",
        url: "/"
    },
    {
        name: "Contact",
        url: "/"
    },
]

const socialIcons = [
    {
        icon: IoLogoTwitter,
        color: "hover:text-[#1DA1F2]"
    },
    {
        icon: IoLogoLinkedin,
        color: "hover:text-[#0A66C2]"
    },
    {
        icon: IoLogoFacebook,
        color: "hover:text-[#1877F2]"
    },
    {
        icon: IoLogoGithub,
        color: "hover:text-white"
    },
    {
        icon: IoLogoDribbble,
        color: "hover:text-[#EA4C89]"
    },
]

export const Footer = () => {

    const pathName = usePathname()
    const year = new Date().getFullYear()

    const excludedPaths = [HOME, ABOUT_US, CONTACT_US]

    if (!excludedPaths.includes(pathName)) {
        return
    }

    return (
        <footer className='bg-[#101828] w-full text-[#EAECF0] text-xs py-10'>
            <ContentPage>
                <div className='flex flex-col lg:flex-row space-y-4'>
                    <div className='w-full md:w-2/6 flex flex-col items-center text-center md:items-start md:text-left'>
                        <div className="relative w-20 h-16">
                            <Image src={LOGO} fill alt="Logo" sizes='80px' />
                        </div>
                        <p className='w-70 mt-8'>Top learning experiences that create more talent in the world.</p>
                    </div>

                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 w-full md:w-4/6'>

                        {/* Product */}
                        <div className='space-y-3'>
                            <h2 className='text-[#98A2B3] '>Product</h2>
                            <ul className='space-y-3'>
                                {products.map(({ url, name }, index) => (
                                    <li key={index} className="cursor-pointer">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Companies */}
                        <div className='space-y-3'>
                            <h2 className='text-[#98A2B3] '>Companies</h2>
                            <ul className='space-y-3'>
                                {companies.map(({ url, name }, index) => (
                                    <li key={index} className="cursor-pointer">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div className='space-y-3'>
                            <h2 className='text-[#98A2B3] '>Social</h2>
                            <ul className='space-y-3'>
                                {social.map(({ url, name }, index) => (
                                    <li key={index} className="cursor-pointer">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className='space-y-3'>
                            <h2 className='text-[#98A2B3] '>Legal</h2>
                            <ul className='space-y-3'>
                                {legal.map(({ url, name }, index) => (
                                    <li key={index} className="cursor-pointer">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between mt-8 space-y-4'>
                    <p className='text-[#98A2B3]'>
                        © {year} Santiago. All rights reserved.
                    </p>
                    <div className='flex gap-4'>
                        {socialIcons.map(({ icon: Icon, color }, index) => (
                            <Icon key={index} strokeWidth={1} className={`${color} cursor-pointer hover:scale-105 text-xl transition-all duration-300`} />
                        ))}
                    </div>
                </div>
            </ContentPage>
        </footer>
    )
}
