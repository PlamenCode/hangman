import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

export default function PopUp({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    
    useEffect(() => setPlayable(playable));

    if(checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ){
        finalMessage = 'Congratulation! You Won! 😀';
        playable = false;
    } else if(checkWin(correctLetters, wrongLetters, selectedWord) === 'lose'){
        finalMessage = 'Unfortunately! You Lost. 😟';
        finalMessageRevealWord = `...the word was '${selectedWord}'`;
        playable = false;
    };


  return (
    <div className="popup-container" style={finalMessage !== '' ? {display: 'flex'} : {}}>
        <div className="popup" >
            <h2>{finalMessage}</h2>
            <h3>{finalMessageRevealWord}</h3>
            <button onClick={playAgain}>Play Again</button>
        </div>
    </div>
  )
}
