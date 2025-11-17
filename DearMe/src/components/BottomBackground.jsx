import '../styles/BottomBackground.css';
import '../styles/WelcomeSections.css';

function BottomBackground({children}) {
    return (
        <div className='bottom-background-container'>
            {children}
        </div>
    )
}

export default BottomBackground;