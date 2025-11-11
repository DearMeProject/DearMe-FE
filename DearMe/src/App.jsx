import { useState } from 'react';
import useTimePeriod from './hooks/useTimePeriod';
import Background from './components/Background';
import Header from './components/Header';
import WelcomeSections from './components/WelcomeSections';
import BottomBackground from './components/BottomBackground';
import './styles/App.css';

function App() {
  return (
    <div>
      <Background />
      <Header/>
      <WelcomeSections/>
      <BottomBackground/>
    </div>
  )
}

export default App
