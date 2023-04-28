import React, { useState, useEffect } from 'react';
import Header from './Header';
import Figure from './Figure';
import WrongLetters from './WrongLetters';
import Word from './Word';
import Popup from './Popup';
import Notification from './Notification';
import { showNotification as show, checkWin } from '../helpers/helpers';
import Tries from "./Tries";

// TASK - We can come up with more words
const words = ['application', 'programming', 'interface', 'wizard', 
'position', 'mislead', 'performance', 'shrink', 'evolution', 'strength', 'lighthall',
'spotify', 'youtube', 'netflix', 'shrek', 'spiderman', 'superman', 'batman',
'itunes', 'iphone', 'android', 'galaxy', 'mario', 'nike', 'adidas', 'restaurant',
'bakery', 'manhattan', 'brooklyn', 'shazam', 'spiderman', 'superman', 'batman', 'amazon',
'drake', 'kendrick', 'matilda', 'memes', 'cheetos', 'dorritos', 'fanta', 'pepsi',
'playstation', 'xbox', 'samsung', 'ikea', 'walmart', 'target', 'tesla', 'ebay',
'tacos', 'dumplings', 'margarita', 'californa', 'paris', 'country', 'brazil', 'soccer',
'chelsea', 'argentina', 'ocean', 'mountain', 'alligator', 'parrot'
];

// TASK - We should be able to set a selected word and create a link to share for that game
let selectedWord = words[Math.floor(Math.random() * words.length)];

const GameVisual = ({setScreen, playerId}) => {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);

  }, [correctLetters, wrongLetters, playable]);

  const buttons = "abcdefghjklmnopqrstuvwxyz".split("")

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  let tries = 6 - wrongLetters.length
  function checkLeaderboard() {
    setScreen('leaderboard');
  }

  useEffect(() => {
    console.log('Hangman playerId:');
    console.log(playerId);
  }, [playerId]);

  return (
    <>
      <Header setScreen={setScreen}/>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <Tries tries={tries}/>
      </div>
      <WrongLetters wrongLetters={wrongLetters} />
      <Popup setScreen={setScreen} correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} checkLeaderboard={checkLeaderboard} playerId={playerId} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default GameVisual;