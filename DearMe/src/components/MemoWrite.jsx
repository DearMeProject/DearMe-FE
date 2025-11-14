import '../styles/MemoWrite.css';
import usePeriodTime from '../hooks/useTimePeriod';

function MemoWrite({ parsingDate, onClose }) {

    const period = usePeriodTime();
    const welcomeMessage = period === 'day' ? '오늘 하루를 기분좋게 시작해봐요! 🍀' : '오늘 하루는 어땠나요? 🌕';


    return (
        <div className='memo-write-container'>
            <p className='memo-box-date'>{parsingDate}</p>
            <p className='memo-write-welcome-message'>{welcomeMessage}</p>
            <div className='memo-write-emoji-select-section'>
                <p className='memo-write-emoji-select-section-text'>오늘 내 감정은?</p>
            </div>
            <input
                type="text"
                className="memo-write-title-input"
                placeholder="제목을 입력하세요."
                maxLength={20} 
            />
            <textarea
                className="memo-write-content-textarea"
                placeholder="오늘의 이야기를 들려주세요."
            />
            <div className='memo-box-buttons'>
                <button className='memo-box-button-close' onClick={onClose}>
                    닫기
                </button>
                <button
                    className='memo-box-button-add'
                    onClick={() => {
                        // 작성한 메모 서버로 보내기
                    }}>
                    작성하기
                </button>
            </div>
        </div>
    )
}

export default MemoWrite;