import React, { useState } from 'react';
import classNames from 'classnames';

// Liste de mots cachés à trouver
const wordsToFind = ['Harry', 'Ron', 'Hermione', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', 'Quidditch', 'Wizard', 'Magic'];

// Grille de lettres pour le jeu
const grid = [
  ['H', 'A', 'R', 'R', 'Y', 'R', 'A', 'V', 'E', 'N'],
  ['Y', 'G', 'R', 'Y', 'F', 'F', 'I', 'N', 'D', 'O'],
  ['D', 'D', 'A', 'F', 'G', 'L', 'Y', 'H', 'R', 'A'],
  ['E', 'N', 'N', 'C', 'N', 'I', 'F', 'F', 'U', 'W'],
  ['F', 'L', 'E', 'R', 'U', 'L', 'E', 'G', 'R', 'L'],
  ['I', 'A', 'T', 'Q', 'W', 'E', 'R', 'Y', 'L', 'O'],
  ['T', 'H', 'E', 'R', 'M', 'I', 'O', 'N', 'E', 'I'],
  ['I', 'K', 'O', 'L', 'I', 'V', 'N', 'W', 'U', 'D'],
  ['T', 'N', 'I', 'W', 'I', 'Z', 'A', 'R', 'D', 'M'],
  ['H', 'I', 'R', 'L', 'E', 'Y', 'N', 'P', 'L', 'E'],
];

const GameHogwarts: React.FC = () => {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // Vérifier si le mot est présent dans la liste des mots cachés
  const checkWord = (word: string) => {
    const foundWord = wordsToFind.find((w) => w.toLowerCase() === word.toLowerCase());
    if (foundWord && !foundWords.includes(foundWord)) {
      setFoundWords((prevFoundWords) => [...prevFoundWords, foundWord]);
      setMessage(`You found: ${foundWord}`);
    } else {
      setMessage('Not found!');
    }
  };

  // Gérer le relâchement du clic de souris
  const handleMouseUp = () => {
    // Construction du mot sélectionné
    let selectedWord = '';
    selectedCells.forEach((cell) => {
      selectedWord += cell;
    });

    // Vérification du mot
    if (selectedWord.length > 2) {
      checkWord(selectedWord);
    }

    // Réinitialiser les cellules sélectionnées après la vérification
    setSelectedCells(new Set());
  };

  // Gérer la sélection de cellules
  const handleCellClick = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const newSelectedCells = new Set(selectedCells);

    if (newSelectedCells.has(cellKey)) {
      newSelectedCells.delete(cellKey);
    } else {
      newSelectedCells.add(cellKey);
    }

    setSelectedCells(newSelectedCells);
  };

  // Vérifier si une cellule est sélectionnée
  const isCellSelected = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    return selectedCells.has(cellKey);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-10 gap-1" onMouseUp={handleMouseUp}>
        {grid.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((letter, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={classNames(
                  'w-10 h-10 border border-gray-300 rounded-md flex justify-center items-center text-lg font-bold',
                  {
                    'bg-yellow-300': isCellSelected(rowIndex, colIndex),
                    'text-gray-800': foundWords.some((word) => word.toLowerCase() === letter.toLowerCase()),
                  }
                )}
              >
                {letter}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="ml-4 text-gray-800">
        <h2 className="text-xl font-bold mb-2">Words to Find:</h2>
        <ul>
          {wordsToFind.map((word, index) => (
            <li key={index} className={classNames({ 'line-through': foundWords.includes(word) })}>
              {word}
            </li>
          ))}
        </ul>
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

export default GameHogwarts;
