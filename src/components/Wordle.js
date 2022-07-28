import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Modal from './Modal';
import Keypad from './Keypad';

export default function Wordle({ solution }) {
    const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup } = useWordle(solution);
    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModel(true), 1000);
            window.removeEventListener('keyup ', handleKeyup);
        }

        if (turn > 5) {
            setTimeout(() => setShowModel(true), 1000);
            window.removeEventListener('keyup', handleKeyup);
        }

        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn]);

    return (
        <div>
            <div>solution - { solution }</div>
            <Grid currentGuess={ currentGuess } guesses= { guesses } turn={ turn }/>
            <Keypad usedKeys={ usedKeys }/>
            {showModel && <Modal isCorrect={ isCorrect } turn={ turn } solution={ solution }/>}
        </div>
    )
}