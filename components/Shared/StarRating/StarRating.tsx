interface StarRatingProps {
    rating: number  
}

export const StarRating = ({ rating}: StarRatingProps) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => {
                const fill = Math.min(Math.max(rating - i, 0), 1) // 0, 0.3, 1, etc.
                return <Star key={i} fill={fill} />
            })}
        </div>
    )
}

const Star = ({ fill }: { fill: number }) => {
    const id = Math.random().toString(36).slice(2)
    
    return (
        <svg width="16" height="16" viewBox="0 0 16 16">
            <defs>
                <linearGradient id={id}>
                    <stop offset={`${fill * 100}%`} stopColor="#20B486" />
                    <stop offset={`${fill * 100}%`} stopColor="#D1D5DB" />
                </linearGradient>
            </defs>
            <polygon
                points="8,1 10,6 15,6 11,9.5 12.5,15 8,12 3.5,15 5,9.5 1,6 6,6"
                fill={`url(#${id})`}
            />
        </svg>
    )
}