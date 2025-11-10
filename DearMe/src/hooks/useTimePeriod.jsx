import { useState, useEffect } from "react";

function usePeriodTime() {
    const [period, setPeriod] = useState(getPeriod());

    function getPeriod() {
        const now = new Date();
        const hours = now.getHours();

        return (hours >= 6 && hours < 18) ? 'day' : 'night';
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setPeriod(getPeriod());
        }, 60000);
        return () => clearInterval(interval);
    })

    return period;
}

export default usePeriodTime;