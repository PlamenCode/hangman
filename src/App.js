import React, { Fragment, useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import PopUp from "./components/PopUp";
import Notification from "./components/Notification";

import { showNotification as show } from './helpers/helpers';
import { words } from "./assets/word";

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        function handleKeyDown(e) {
            const { key, keyCode } = e;

            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();

                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters(currLetters => [...currLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters(currLetters => [...currLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [ correctLetters, wrongLetters, playable ]);

    function playAgain(){
        setPlayable(true);
        setCorrectLetters([]);
        setWrongLetters([]);
        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];
    }

    return (
        <Fragment>
            <Header />
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            </div>
            <PopUp 
                correctLetters={correctLetters} 
                wrongLetters={wrongLetters}
                selectedWord={selectedWord}
                setPlayable={setPlayable}
                playAgain={playAgain}
            />
            <Notification showNotification={showNotification} />
        </Fragment>
    );
}

export default App;
