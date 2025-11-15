import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import useTimePeriod from './hooks/useTimePeriod';
import Background from './components/Background';
import Header from './components/Header';
import WelcomeSections from './components/WelcomeSections';
import BottomBackground from './components/BottomBackground';
import CalendarSection from './components/CalendarSection';
import { ExitChatButton } from "./components/ChatButtons.jsx";
import { GoChatButton } from "./components/ChatButtons.jsx";
import './styles/App.css';
import getMemos from './api/getMemos.jsx';

function App() {

  const [memoList, setMemoList] = useState([]);
  const refreshMemos = async () => {
    const response = await getMemos();
    setMemoList(response.data.data.memos);
    console.log(response);
    console.log("가져온 메모", response.data.data.memos);
  }

  useEffect(() => {
    refreshMemos();
  }, []);

  return (
    <div>
      <Background />
      <Header />
      <WelcomeSections />
      <BottomBackground>
        <div className="content-stack-wrapper">
          <CalendarSection memos={memoList} refreshMemos={refreshMemos}/>
          <div className="chat-button-container-below">
            <GoChatButton memos={memoList} />
          </div>
        </div>
      </BottomBackground>
    </div>
  );
}

export default App;