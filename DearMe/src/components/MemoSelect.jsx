import ReactDOM from "react-dom";
import { useState } from "react";
import '../styles/MemoSelect.css';
import sendMemoIds from "../api/sendMemoIds";

const STRINGTOEMOJI = {
    'HAPPY': "😀",
    'NEUTRAL': '😐',
    'SLEEPY': '😴',
    'SAD': '😢',
    'ANGRY': '😡'
}

function MemoSelect({ memos, onClose, setButtonPressed }) {

    const [selectedMemoIds, setSelectedMemoIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const groupedMemos = memos.reduce((acc, memo) => {
        const { date } = memo;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(memo);
        return acc;
    }, {});

    const handleMemoClick = (memoId) => {
        if (selectedMemoIds.includes(memoId)) {
            setSelectedMemoIds(prevIds => prevIds.filter(id => id !== memoId));
        } else {
            if (selectedMemoIds.length >= 3) {
                alert("메모는 최대 3개까지만 선택할 수 있습니다.");
                return;
            }
            setSelectedMemoIds(prevIds => [...prevIds, memoId]);
        }
    }

    const handleButtonClick = async () => {
        if (selectedMemoIds.length === 0) {
            alert("상담할 메모를 적어도 1개 선택해 주세요.");
            return;
        }

        setLoading(true);
        try {
            const response = await sendMemoIds(selectedMemoIds);
            if (response.status === 200) {
                console.log(response);
                return;
            }
            else alert("메모 전송에 실패하였습니다.")
        } catch {
            alert("메모 전송 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
            setButtonPressed(true);
            onClose();
        }
    }

    return ReactDOM.createPortal(
        <>
            <div className="background-overlay" onClick={onClose}></div>
            <div className="memo-select-container">
                <div className="memo-list-area">
                    {
                        Object.entries(groupedMemos).map(([date, memos]) => (
                            <div
                                key={date}
                                className='memo-select-section'>
                                <p className='memo-box-date'>{date}</p>
                                <div className='memos-row-wrapper'>
                                    {
                                        memos.map((memo, index) => (
                                            <div
                                                key={index}
                                                className={`memo-card-container ${selectedMemoIds.includes(memo.memoId) ? 'selected' : ''
                                                    }`}
                                                onClick={() => handleMemoClick(memo.memoId)}>
                                                <p className='memo-card-emoji'>{STRINGTOEMOJI[memo.emoji]}</p>
                                                <p className='memo-card-title'>{memo.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="memo-select-button-area">
                    <button className="memo-select-button"
                        onClick={async () => {
                            await handleButtonClick();
                        }}>확인</button>
                </div>
            </div>

            {loading && (
                <div className='loading-overlay'>
                    <div className='loading-spinner'></div>
                    <p className='loading-text'>로딩중입니다...</p>
                </div>
            )}
        </>,
        document.body
    );
}

export default MemoSelect;