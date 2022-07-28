import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'};
        });

        formattedGuess.forEach((char, index) => {
            if (char.key === solutionArray[index]) {
                formattedGuess[index].color = 'green';
                solutionArray[index] = null;
            }
        });

        formattedGuess.forEach((char, index) => {
            if (char.color !== 'green' && solutionArray.includes(char.key)) {
                formattedGuess[index].color = 'yellow';
                solutionArray[solutionArray.indexOf(char.key)] = null;
            }
        });

        return formattedGuess;
    };

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setUsedKeys((prevUsedKeys) => {
            let newUsedKeys = {...prevUsedKeys};
            
            formattedGuess.forEach((char) => {
                const currentColor = newUsedKeys[char.key];

                if (char.color === 'green') {
                    newUsedKeys[char.key] = 'green';
                    return;
                }

                if (currentColor !== 'green' && char.color === 'yellow') {
                    newUsedKeys[char.key] = 'yellow';
                    return;
                }

                if (currentColor !== 'green' && currentColor !== 'yellow' && char.color === 'grey') {
                    newUsedKeys[char.key] = 'grey';
                    return;
                }
                
            });

            return newUsedKeys;
        });

        setHistory([...history, currentGuess]);
        setTurn(turn + 1);
        setCurrentGuess('');
    };

    const handleKeyup = ({ key }) => {
        if (key === 'Backspace') {
            setCurrentGuess(currentGuess.slice(0, -1));
            return;
        }

        if (key === 'Enter') {
            if (turn > 5) return;

            if (history.includes(currentGuess)) return;

            if (currentGuess.length !== 5) return;

            const formattedGuess = formatGuess();
            addNewGuess(formattedGuess);

            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length > 4) return;
            setCurrentGuess(currentGuess + key);
        }
    };

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;