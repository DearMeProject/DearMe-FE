import { useState, useEffect } from 'react'; // useEffect 추가
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

  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        setIsLoading(true); 
        const response = await getMemos(); 
        setMemos(response.data.memos); 

      } catch (err) {
        console.error("App에서 메모 로드 실패:", err);
      } 
    };

    fetchMemos(); 

  }, []); 

  return (
    <div>
      <Background />
      <Header />
      <WelcomeSections />
      <BottomBackground>
        <div className="content-stack-wrapper">
          <CalendarSection memos={memos} /> 
          <div className="chat-button-container-below">
            <GoChatButton memos={memos} />
          </div>
        </div>
      </BottomBackground>
    </div>
  );
}

export default App;