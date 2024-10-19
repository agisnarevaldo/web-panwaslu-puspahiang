const TimeDisplay = ({ value, label} : { value: number, label: string }) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <p className="text-7xl font-medium">{value}</p>
            <p className="text-2xl">{label}</p>
        </div>
    );
}

export default TimeDisplay;