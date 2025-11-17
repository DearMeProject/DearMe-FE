import { useState } from 'react';
import '../styles/ChatButtons.css';
import MemoSelect from './MemoSelect';

function GoChatButton({ memos, setButtonPressed, selectedMemoIds, setSelectedMemoIds, setChatResponse }) {

    const [isOpenedMemoSelect, setIsOpenendMemoSelect] = useState(false);

    return (
        <div>
            <button className="go-chat-button"
                onClick={() => {
                    setIsOpenendMemoSelect(true);
                }}>
                <span>내 마음 알아가기 🛫</span>
            </button>

            {isOpenedMemoSelect &&
                <MemoSelect
                    memos={memos}
                    onClose={() => setIsOpenendMemoSelect(false)}
                    setButtonPressed={setButtonPressed}
                    selectedMemoIds={selectedMemoIds}
                    setSelectedMemoIds={setSelectedMemoIds}
                    setChatResponse={setChatResponse} />
            }
        </div>
    )
}

function ExitChatButton({ setButtonPressed, setSelectedMemoIds }) {
    return (
        <div>
            <button className="go-chat-button"
                onClick={() => {
                    setButtonPressed(false);
                    setSelectedMemoIds([]);
                }}>
                <span>홈으로 돌아가기 🏡</span>
            </button>
        </div>
    )
}

export { GoChatButton, ExitChatButton };