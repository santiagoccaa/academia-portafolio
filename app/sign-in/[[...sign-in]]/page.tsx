import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function Page() {
    return (
        <div className='relative overflow-hidden bg-white'>
            <div className='absolute top-9 left-9 z-50'>
                <Link href="/" className='rounded-full text-md flex items-center gap-1 group font-bold text-gray-800'>
                    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-primary group-hover:-translate-x-1 duration-300'>
                        <IoMdArrowRoundBack size={20} />
                    </div>
                    Academy
                </Link>
            </div>
            <img src={"/general/vector.png"} className='w-full absolute bottom-0 left-0 h-100' alt='vector' style={{ filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))' }} />
            {/* <PageContainer> */}
            <div className='flex flex-col lg:flex-row justify-center h-screen '>
                <div className='w-full lg:w-1/2 flex items-center justify-center'>
                    <div className='space-y-4 shadow-md bg-white pt-4 rounded-md text-center flex flex-col items-center'>
                        <img src={"/general/logo.png"} className='w-20 aspect-square' alt='LOGO' />
                        <h1 className='text-2xl font-bold -mt-6'>Bienvenido de vuelta</h1>
                        <SignIn
                            appearance={{
                                elements: {
                                    footer: { display: "none" },
                                    cardBox: { boxShadow: "none", width: "350px" },
                                    header: { display: "none" }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='w-1/2 hidden lg:flex flex-col gap-y-2 justify-center'>
                    <h2 className='text-4xl font-bold text-gray-800'>Academy</h2>
                    <h1 className='text-6xl font-extrabold text-gray-800'>Inicia Sesion</h1>
                </div>
            </div>
            {/* </PageContainer> */}
        </div>
    )
}