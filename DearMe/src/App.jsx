import { useState } from 'react';
import useTimePeriod from './hooks/useTimePeriod';
import Background from './components/Background';
import Header from './components/Header';
import WelcomeSections from './components/WelcomeSections';
import './styles/App.css';

function App() {
  return (
    <div>
      <Background />
      <Header/>
      <WelcomeSections/>
    </div>
  )
}

export default App
