import Image from 'next/image'

export interface CardBlogProps {
    image: string
    title: string
    description: string
    date: string
    direction?: 'row' | 'col'
}

export const CardBlog = (blog: CardBlogProps) => {
    const { description, image, title, date, direction } = blog
    return (
        <div className={`w-full flex ${direction === 'col' ? 'flex-col h-80' : 'min-h-40 lg:h-40 flex-col lg:flex-row'}`}>
            <div className={`h-40 relative ${direction === 'col' ? 'w-full' : 'w-full lg:w-1/2'}`}>
                <Image src={`/blog/${image}.png`} alt={title} fill />
            </div>
            <div className={`space-y-2 ${direction === 'col' ? 'w-full pt-2' : 'w-full lg:w-1/2 pl-2'}`}>
                <span className='text-xs font-bold text-primary'>{date}</span>
                <h3 className='font-bold'>{title}</h3>
                <p className='text-sm text-gray-600'>{description}</p>
            </div>
        </div>
    )
}
