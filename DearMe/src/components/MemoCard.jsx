import '../styles/MemoCard.css';

function MemoCard({ memoData }) {
    return (
        <>
            {
                memoData.map((memo, index) => 
                    <div className='memo-card-container'>
                        <p className='memo-card-emoji'>{memo.emoji}</p>
                        <p className='memo-card-title'>{memo.title}</p>
                    </div>          
                )
            }
        </>
    )
}

export default MemoCard;