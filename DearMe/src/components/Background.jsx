import usePeriodTime from "../hooks/useTimePeriod";
import '../styles/Background.css'

function Background() {
    const period = usePeriodTime();
    
    return (
        <div className='background-container'>
            <img src={
                period === 'day' ? 
                '/images/background/bg_day.jpg' : '/images/background/bg_night.jpg'
            }/>
        </div>
    )
}

export default Background;