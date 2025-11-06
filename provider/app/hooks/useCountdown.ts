import { useEffect, useState } from "react";

export default function useCountdown(expireAt: string) {
    const [timeLeft, setTimeLeft] = useState(() => {
        const diff = new Date(expireAt).getTime() - Date.now();
        return Math.max(0, diff);
    });

    useEffect(() => {
        const id = setInterval(() => {
            setTimeLeft(Math.max(0, new Date(expireAt).getTime() - Date.now()));
        }, 1000);
        return () => clearInterval(id);
    }, [expireAt]);

    // returns human-readable string
    const human = () => {
        const s = Math.floor(timeLeft / 1000);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        if (s <= 0) return "Expired";
        if (h > 0) return `${h}h ${m}m`;
        if (m > 0) return `${m}m ${sec}s`;
        return `${sec}s`;
    };

    return { ms: timeLeft, human: human() };
}