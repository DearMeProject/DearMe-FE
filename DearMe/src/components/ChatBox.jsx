import '../styles/ChatBox.css'
import MemoCard from './MemoCard.jsx';

function AIChatBox({ text }) {
    return (
        <div className='ai-chat-box-container'>
            {text}
        </div>
    )
}

function UserChatBox({ memos, selectedMemoIds }) {

    const selectedMemos = memos.filter(memo =>
        selectedMemoIds.includes(memo.memoId)
    );

    return (
        <div className='user-chat-box-container'>
            <MemoCard memosByDate={selectedMemos} />
        </div>
    )
}

export { AIChatBox, UserChatBox };