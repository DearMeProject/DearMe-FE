import { useState } from 'react';
import '../styles/EmojiList.css';

const emojiState = [
    '😊 너무 좋아요!',
    '😐 평범해요',
    '😴 피곤해요...',
    '😢 우울해요',
    '😡 너무 화나요!'
]

function EmojiList( { setSelectedEmoji }) {

    const [open, setOpen] = useState(false);
    const [selectedState, setSelectedState] = useState(emojiState[0]);

    return (
        <div className='select-box' onClick={() =>
            setOpen(!open)
        }>
            <label className='select-box-label'>{selectedState}</label>
            {open && (
                <ul className='select-options'>
                    {
                        emojiState.map(function (state, index) {
                            return (
                                <li className='select-box-option' key={index} onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedState(state);
                                    setOpen(!open);
                                    const emoji = emojiState[index].split(' ');
                                    setSelectedEmoji(emoji[0]);
                                }} > {emojiState[index]} </li>
                            )
                        })
                    }
                </ul>
            )}
        </div>
    )
}

export default EmojiList;