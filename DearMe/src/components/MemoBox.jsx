import ReactDOM from "react-dom";
import { useState } from "react";
import '../styles/MemoBox.css';
import MemoCard from "./MemoCard";
import MemoWrite from "./MemoWrite";

function MemoBox({ selectedDate, onClose }) {
    const parsingDate = () => {
        return `${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`
    }

    const TESTDATA = {
        status: 200,
        message: '조회 성공',
        data: {
            xClientId: 'abc123',
            memos: [
                {
                    memoId: 123,
                    date: '2025-11-10',
                    emoji: "😊",
                    title: '좋은 하루 가나다라'
                },
                {
                    memoId: 124,
                    date: '2025-11-10',
                    emoji: "😢",
                    title: '힘든 하루'
                },
                // {
                //     memoId: 125,
                //     date: '2025-11-10',
                //     emoji: "😡",
                //     title: '짜증나는 하루'
                // },
            ]
        }
    }
    // 서버에서 받아와야할 데이터

    const isAddButtonDisabled = TESTDATA.data.memos.length >= 3;
    const [clickedAddButton, setClickedAddButton] = useState(false);

    return ReactDOM.createPortal(
        <>
            <div className="background-overlay" onClick={onClose}></div>
            <div className="memo-box-container">
                <p className='memo-box-date'>{parsingDate()}</p>
                <MemoCard memoData={TESTDATA.data.memos} />
                <div className='memo-box-buttons'>
                    <button className='memo-box-button-close' onClick={onClose}>
                        닫기
                    </button>
                    <button
                        className='memo-box-button-add'
                        disabled={isAddButtonDisabled}
                        onClick={() => {
                            setClickedAddButton(true);
                        }}>
                        추가
                    </button>
                </div>
            </div>
            {clickedAddButton && <MemoWrite parsingDate={parsingDate()} onClose={() => setClickedAddButton(false)}/>}
        </>,
        document.body
    );
}

export default MemoBox;
