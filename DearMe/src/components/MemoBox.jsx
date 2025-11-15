import ReactDOM from "react-dom";
import { useState } from "react";
import '../styles/MemoBox.css';
import MemoCard from "./MemoCard";
import MemoWrite from "./MemoWrite";

function MemoBox({ memosByDate, selectedDate, onClose }) {
    
    const parsingDate = () => {
        const memoDate = selectedDate.split('-');
        return `${memoDate[0]}.${memoDate[1]}.${memoDate[2]}`
    }

    const isAddButtonDisabled = memosByDate.length >= 3;
    const [clickedAddButton, setClickedAddButton] = useState(false);

    return ReactDOM.createPortal(
        <>
            <div className="background-overlay" onClick={onClose}></div>
            <div className="memo-box-container">
                <p className='memo-box-date'>{parsingDate()}</p>
                <MemoCard memosByDate={memosByDate} />
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
