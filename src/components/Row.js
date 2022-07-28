import React from 'react'

export default function Row({ guess, currentGuess }) {

    if (guess) {
        return (
            <div className='row past'>
                { guess.map((char, index) => <div key={ index } className={ char.color }>{ char.key }</div>) }
            </div>
        )
    }

    if (currentGuess) {
        let chars = [...currentGuess];
        return (
            <div className='row current'>
                { chars.map((char, index) => <div key={ index } className='filled' >{ char }</div>) }
            {[...Array(5 - chars.length)].map((_, index) => <div key={ index }></div>)}
            </div>
        )
    }

    return (
        <div className='row'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
