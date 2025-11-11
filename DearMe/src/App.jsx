import { useState } from 'react';
import useTimePeriod from './hooks/useTimePeriod';
import Background from './components/Background';
import Header from './components/Header';
import './styles/App.css';

function App() {
  return (
    <div>
      <Background />
      <Header/>
    </div>
  )
}

export default App
