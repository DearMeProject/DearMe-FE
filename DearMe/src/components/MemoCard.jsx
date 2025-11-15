import '../styles/MemoCard.css';
import { useState } from "react";
import MemoRead from './MemoRead';

const STRINGTOEMOJI = {
  'HAPPY':"😀",
  'NEUTRAL': '😐',
  'SLEEPY': '😴',
  'SAD': '😢',
  'ANGRY': '😡'
}

function MemoCard({ memosByDate }) {

    const [selectedMemo, setSelectedMemo] = useState(null);

    return (
        <>
            {
                memosByDate.map((memo, index) => (
                    <div 
                        key={memo.memoId} 
                        className='memo-card-container'
                        onClick={() => {
                            setSelectedMemo(memo);
                        }}>
                        <p className='memo-card-emoji'>{STRINGTOEMOJI[memo.emoji]}</p>
                        <p className='memo-card-title'>{memo.title}</p>
                    </div>
                ))
            }

            {selectedMemo && (
                <MemoRead 
                    memo={selectedMemo} 
                    onClose={() => setSelectedMemo(null)} 
                />
            )}
        </>
    )
}

export default MemoCard;