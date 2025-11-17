import '../styles/ChatSection.css';
import { AIChatBox, UserChatBox } from './ChatBox';

function ChatSection({ memos, selectedMemoIds, chatResponse }) {

    const chats = chatResponse.split('\n').filter(Boolean);

    return (
        <>
            <p className='chat-section-welcome-text'>조금씩 풀어가요, 당신의 마음을 이해하는 시간이에요.</p>
            <div className='chat-text-container'>
                <AIChatBox text={
                    "안녕하세요 🌿\n오늘은 어떤 마음으로 오셨나요?"
                } />
                <UserChatBox
                    memos={memos}
                    selectedMemoIds={selectedMemoIds}
                />
                {
                    chats.map((chat, index) => (
                        <AIChatBox key={index} text={chat} />
                    ))
                }
            </div>
        </>
    )
}

export default ChatSection;