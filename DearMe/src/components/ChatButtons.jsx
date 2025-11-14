import '../styles/ChatButtons.css';

function GoChatButton() {
    return (
        <div>
            <button className="go-chat-button">
                <span>내 이야기 털어놓기 💬</span>
            </button>
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