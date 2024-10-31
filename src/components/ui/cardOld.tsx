export default function CardOld({title, children, classname}: {
    title: string,
    children: React.ReactNode
    classname?: string,
}) {
    return (
        <div className={`${classname} flex border border-secondary py-4 px-6 rounded-lg gap-3`}>
            <h1 className="text-xl font-semibold">{title}</h1>
            {children}
        </div>
    );
}
