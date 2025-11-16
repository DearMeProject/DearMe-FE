import { useState } from 'react';
import '../styles/ChatButtons.css';
import MemoSelect from './MemoSelect';

function GoChatButton({ memos, setButtonPressed }) {

    const [isOpenedMemoSelect, setIsOpenendMemoSelect] = useState(false);

    return (
        <div>
            <button className="go-chat-button"
                onClick={() => {
                    setIsOpenendMemoSelect(true);
                }}>
                <span>내 마음 알아가기 💬</span>
            </button>

            {isOpenedMemoSelect && <MemoSelect memos={memos} onClose={() => setIsOpenendMemoSelect(false)} setButtonPressed={setButtonPressed} />}
        </div>
    )
}

function ExitChatButton() {
    return (
        <div>
            <button className="exit-chat-button">
                <span>나가기</span>
            </button>
        </div>
    )
}

export { GoChatButton, ExitChatButton };