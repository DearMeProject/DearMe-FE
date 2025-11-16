// 1. ReactDOM을 import 합니다.
import ReactDOM from "react-dom";
import '../styles/MemoRead.css';

const STRINGTOEMOJI = {
    'HAPPY': "😀",
    'NEUTRAL': '😐',
    'SLEEPY': '😴',
    'SAD': '😢',
    'ANGRY': '😡'
}

const emojiState = {
    '😊': '너무 좋아요!',
    '😐': '평범해요',
    '😢': '우울해요',
    '😡': '너무 화나요!',
    '😴': '피곤해요...'
}

function MemoRead({ onClose, memo, memoContent }) {

    const memoDate = memo.date.split('-');
    const parsingDate = () => {
        return `${memoDate[0]}.${memoDate[1]}.${memoDate[2]}`
    }
    
    const emoji = STRINGTOEMOJI[memo.emoji];
    const emojiText = emojiState[emoji];

    return ReactDOM.createPortal(
        <>
            <div className='memo-read-container'>
                <p className='memo-box-date'>{parsingDate()}</p>
                <div className='memo-write-emoji-select-section'>
                    <p className='memo-write-emoji-select-section-text'>오늘 내 감정은?</p>
                    <p className='memo-read-emoji'>{emoji}</p>
                    <p className='memo-read-emoji-state'>{emojiText}</p>
                </div>
                <p className='memo-read-title-p'>{memo.title}</p>
                <p className='memo-read-content-p'>{memoContent}</p>
                <div className='memo-box-buttons'>
                    <button className='memo-read-button-close' onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </>,

        document.body
    );
}

export default MemoRead;