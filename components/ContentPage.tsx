interface PageContainerProp {
    children: React.ReactNode
}

export const ContentPage = ({ children }: PageContainerProp) => {
    return (
        <div className="container mx-auto px-2 md:px-8 lg:px-12">
            {children}
        </div>
    )
}
