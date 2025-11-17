import { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import WelcomeSections from './components/WelcomeSections';
import BottomBackground from './components/BottomBackground';
import CalendarSection from './components/CalendarSection';
import { ExitChatButton } from "./components/ChatButtons.jsx";
import { GoChatButton } from "./components/ChatButtons.jsx";
import ChatSection from './components/ChatSection.jsx';
import './styles/App.css';
import getMemos from './api/getMemos.jsx';

function App() {

  const [memoList, setMemoList] = useState([]);
  const refreshMemos = async () => {
    const response = await getMemos();
    setMemoList(response.data.data.memos);
  }
  const [buttonPressed, setButtonPressed] = useState(false);
  const [selectedMemoIds, setSelectedMemoIds] = useState([]);
  const [chatResponse, setChatResponse] = useState('');

  useEffect(() => {
    refreshMemos();
  }, []);

  return (
    <div>
      <Background />
      <Header />
      <WelcomeSections />
      <BottomBackground>
        {!buttonPressed ?
          <div className="content-stack-wrapper">
            <CalendarSection memos={memoList} refreshMemos={refreshMemos} />
            <div className="chat-button-container-below">
              <GoChatButton
                memos={memoList}
                setButtonPressed={setButtonPressed}
                selectedMemoIds={selectedMemoIds}
                setSelectedMemoIds={setSelectedMemoIds}
                setChatResponse={setChatResponse} />
            </div>
          </div>
          :
          <div className='chat-screen-container'>
            <ChatSection
              memos={memoList}
              selectedMemoIds={selectedMemoIds}
              chatResponse={chatResponse} />
            <div className="chat-button-container-below">
              <ExitChatButton
                setButtonPressed={setButtonPressed}
                setSelectedMemoIds={setSelectedMemoIds} />
            </div>
          </div>
        }
      </BottomBackground>
    </div>
  );
}

export default App;