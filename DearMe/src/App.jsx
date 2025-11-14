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

function App() {

  return (
    <div>
      <Background />
      <Header />
      <WelcomeSections />
      <BottomBackground>
        <div className="content-stack-wrapper">
          <CalendarSection />
          <div className="chat-button-container-below">
            <GoChatButton />
          </div>
        </div>
      </BottomBackground>
    </div>
  )
}

export default App
