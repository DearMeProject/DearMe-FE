import { useState } from 'react';
import '../styles/MemoWrite.css';
import usePeriodTime from '../hooks/useTimePeriod';
import EmojiList from './EmojiList';
import sendMemoContent from '../api/sendMemoContent';

const EMOTIONSCORE = {
    '😊': 20,
    '😐': 40,
    '😴': 60,
    '😢': 80,
    '😡': 100,
}

function MemoWrite({ refreshMemos, selectedDate, onClose }) {

    const period = usePeriodTime();
    const welcomeMessage = period === 'day' ? '오늘 하루를 기분좋게 시작해봐요! 🍀' : '오늘 하루는 어땠나요? 🌕';

    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [memoTitle, setMemoTitle] = useState('');
    const [memoContent, setMemoContent] = useState('');


    const handleSubmit = async () => {
        const score = EMOTIONSCORE[selectedEmoji];

        const memo = {
            date: selectedDate,
            emoji: selectedEmoji,
            title: memoTitle,
            emotionScore: score,
            content: memoContent,
        };

        if (!memo.title || !memo.emoji || !memo.content) {
            alert("이모티콘, 제목, 내용을 모두 입력해 주세요.")
            return;
        }

        const response = await sendMemoContent(memo);
        if(response.status === 201) {
            await refreshMemos();
            onClose();
        }
    }

    return (
        <div className='memo-write-container'>
            <p className='memo-box-date'>{selectedDate}</p>
            <p className='memo-write-welcome-message'>{welcomeMessage}</p>
            <div className='memo-write-emoji-select-section'>
                <p className='memo-write-emoji-select-section-text'>오늘 내 감정은?</p>
                <EmojiList setSelectedEmoji={setSelectedEmoji} />
            </div>
            <input
                type="text"
                className="memo-write-title-input"
                placeholder="제목을 입력하세요."
                maxLength={20}
                value={memoTitle}
                onChange={(e) => setMemoTitle(e.target.value)}
            />
            <textarea
                className="memo-write-content-textarea"
                placeholder="오늘의 이야기를 들려주세요."
                value={memoContent}
                onChange={(e) => setMemoContent(e.target.value)}
            />

            <div className='memo-box-buttons'>
                <button className='memo-box-button-close' onClick={onClose}>
                    닫기
                </button>
                <button
                    className='memo-box-button-add'
                    onClick={async () => {
                        await handleSubmit();
                    }}>
                    작성하기
                </button>
            </div>
        </div>
    )
}

export default MemoWrite;