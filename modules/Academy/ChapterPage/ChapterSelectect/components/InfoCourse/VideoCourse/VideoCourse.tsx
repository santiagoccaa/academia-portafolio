export type VideoCourseProps = {
    videoUrl: string
}

export const VideoCourse = ({ videoUrl }: VideoCourseProps) => {
    return (
        <video src={videoUrl} controls className='w-full rounded-md shadow-md' />
    )
}

