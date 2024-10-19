import {useEffect, useState} from "react";
import TimeDisplay from "@/components/ui/timeDisplay";

const CountDown = ({ targetDate } : {targetDate: Date}) => {
    const [timeLeft, setTimeLeft] = useState<{days: number; hours: number; minutes: number; seconds: number}>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({days, hours, minutes, seconds});
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex flex-col w-full px-12">
           <h2 className="text-2xl font-bold mb-4 text-center">Pilkada 27 November 2024</h2>
            <div className="flex justify-center gap-10">
                <TimeDisplay value={timeLeft.days} label="Hari"/>
                <TimeDisplay value={timeLeft.hours} label="Jam"/>
                <TimeDisplay value={timeLeft.minutes} label="Menit"/>
                <TimeDisplay value={timeLeft.seconds} label="Detik"/>
            </div>
        </div>
    )
}

export default CountDown;