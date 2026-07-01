import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='h-screen bg-red-300'>
            <SignIn />
        </div>
    )
}