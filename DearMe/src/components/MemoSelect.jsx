import ReactDOM from "react-dom";
import { useState } from "react";
import '../styles/MemoSelect.css';

function MemoSelect({ onClose }) {

    const [selectedMemoIds, setSelectedMemoIds] = useState([]);

    const TESTDATA = {
        status: 200,
        message: '조회 성공',
        data: {
            xClientId: 'abc123',
            memos: [
                { memoId: 123, date: '2025-11-8', emoji: "😊", title: '좋은 하루 가나다라' },
                { memoId: 124, date: '2025-11-10', emoji: "😢", title: '힘든 하루' },
                { memoId: 125, date: '2025-11-10', emoji: "😡", title: '짜증나는 하루' },
                { memoId: 126, date: '2025-11-11', emoji: "🤔", title: '고민' },
                { memoId: 127, date: '2025-11-12', emoji: "🎉", title: '파티' },
                { memoId: 128, date: '2025-11-13', emoji: "💻", title: '코딩' },
                { memoId: 129, date: '2025-11-14', emoji: "😴", title: '피곤함' },
            ]
        }
    }

    const groupedMemos = TESTDATA.data.memos.reduce((acc, memo) => {
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
            setSelectedMemoIds(prevIds => [...prevIds, memoId]);
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
                                className='memo-select-section'
                            >
                                <p className='memo-box-date'>{date}</p>

                                <div className='memos-row-wrapper'>
                                    {
                                        memos.map((memo, index) => (
                                            <div
                                                key={index}
                                                className={`memo-card-container ${selectedMemoIds.includes(memo.memoId) ? 'selected' : ''
                                                    }`}
                                                onClick={() => handleMemoClick(memo.memoId)}>
                                                <p className='memo-card-emoji'>{memo.emoji}</p>
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
                    <button className="memo-select-button">확인</button>
                </div>

            </div>
        </>,
        document.body
    );
}

export default MemoSelect;