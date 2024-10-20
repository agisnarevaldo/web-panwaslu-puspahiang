const Header = ({title, description, classname}: { title: string, description?: string, classname?: string }) => {
    return (
        <header className={`${classname}`}>
            <span className="h-[4px] w-14 block bg-secondary mb-4 rounded"></span>
            <h2 className="text-2xl font-semibold">
                {title}
            </h2>
            <p>
                {description}
            </p>
        </header>
    )
}

export default Header;