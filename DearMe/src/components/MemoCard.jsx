import '../styles/MemoCard.css';
import { useState } from "react";
import MemoRead from './MemoRead.jsx';
import getMemoContent from '../api/getMemoContent.jsx';

const STRINGTOEMOJI = {
  'HAPPY':"😀",
  'NEUTRAL': '😐',
  'SLEEPY': '😴',
  'SAD': '😢',
  'ANGRY': '😡'
}

function MemoCard({ memosByDate }) {

    const [selectedMemo, setSelectedMemo] = useState(null);
    const [memoContent, setMemoContent] = useState('');

    const handleClick = async (memo) => {
        const response = await getMemoContent(memo.memoId);
        setMemoContent(response.data.content);
        setSelectedMemo(memo);
    }

    return (
        <>
            {
                memosByDate.map((memo, index) => (
                    <div 
                        key={memo.memoId} 
                        className='memo-card-container'
                        onClick={async () => {
                            await handleClick(memo)
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
                    memoContent={memoContent}
                />
            )}
        </>
    )
}

export default MemoCard;