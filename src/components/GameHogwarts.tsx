import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const GameHogwarts: React.FC = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    // Fetch high score from Firestore
    const fetchHighScore = async () => {
      try {
        const docRef = await db.collection('highscores').doc('hogwarts').get();
        if (docRef.exists()) {
          const data = docRef.data();
          if (data) {
            setHighScore(data.score);
          }
        }
      } catch (error) {
        console.error('Error fetching high score:', error);
      }
    };

    fetchHighScore();
  }, []);

  const initializeCards = () => {
    const shuffledCards = shuffle([...Array(8).keys(), ...Array(8).keys()]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setIsChecking(false);
  };

  const shuffle = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index: number) => {
    if (isChecking || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setTimeout(() => checkForMatch(newFlippedCards), 1000);
    }
  };

  const checkForMatch = (flipped: number[]) => {
    const [first, second] = flipped;
    if (cards[first] === cards[second]) {
      setMatchedCards([...matchedCards, first, second]);
      setScore(score + 1);
    }
    setFlippedCards([]);
    setIsChecking(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleSubmitScore = async () => {
    if (!playerName || score === 0) return;

    try {
      const docRef = db.collection('highscores').doc('hogwarts');
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data();
        if (data) {
          const currentHighScore = data.score || 0;
          if (score > currentHighScore) {
            await docRef.set({ name: playerName, score });
            setHighScore(score);
          }
        }
      } else {
        await docRef.set({ name: playerName, score });
        setHighScore(score);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Memory Match - Hogwarts Edition</h1>

      <div className="flex justify-center mb-4">
        <button onClick={initializeCards} className="bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none">
          New Game
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <div className="text-lg font-bold mr-4">Score: {score}</div>
        {highScore !== null && <div className="text-lg font-bold">High Score: {highScore}</div>}
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        {cards.map((card, index) => (
          <div key={index} className={`w-24 h-24 border-2 rounded-md cursor-pointer ${flippedCards.includes(index) || matchedCards.includes(index) ? 'bg-yellow-300' : 'bg-yellow-100'}`} onClick={() => handleCardClick(index)}>
            <div className="flex justify-center items-center h-full">{card}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center">
        <input type="text" value={playerName} onChange={handleNameChange} placeholder="Enter your name" className="border-2 border-gray-400 rounded-md py-2 px-4 mr-4 focus:outline-none" />
        <button onClick={handleSubmitScore} className="bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none">
          Submit Score
        </button>
      </div>
    </div>
  );
};

export default GameHogwarts;
