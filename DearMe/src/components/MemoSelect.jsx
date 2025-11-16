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

function MemoSelect({ memos, onClose }) {

    const [selectedMemoIds, setSelectedMemoIds] = useState([]);

    // const TESTDATA = {
    //     status: 200,
    //     message: '조회 성공',
    //     data: {
    //         xClientId: 'abc123',
    //         memos: [
    //             { memoId: 123, date: '2025-11-8', emoji: "😊", title: '좋은 하루 가나다라' },
    //             { memoId: 124, date: '2025-11-10', emoji: "😢", title: '힘든 하루' },
    //             { memoId: 125, date: '2025-11-10', emoji: "😡", title: '짜증나는 하루' },
    //             { memoId: 126, date: '2025-11-11', emoji: "🤔", title: '고민' },
    //             { memoId: 127, date: '2025-11-12', emoji: "🎉", title: '파티' },
    //             { memoId: 128, date: '2025-11-13', emoji: "💻", title: '코딩' },
    //             { memoId: 129, date: '2025-11-14', emoji: "😴", title: '피곤함' },
    //         ]
    //     }
    // }

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
            setSelectedMemoIds(prevIds => [...prevIds, memoId]);
        }
    }

    const handleButtonClick = async () => {
        const response = await sendMemoIds(selectedMemoIds);
        if(response.status === 200) {
            // 채팅방으로 이동;
            return ;
        }
        else alert("메모 전송에 실패하였습니다.")
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
                        //채팅화면으로 이동
                    }}>확인</button>
                </div>

            </div>
        </>,
        document.body
    );
}

export default MemoSelect;