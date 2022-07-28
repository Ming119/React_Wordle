import React, { useEffect, useState } from 'react';

export default function Keypad({ usedKeys }) {
    const [ chars, setChars ] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3001/chars')
            .then(res => res.json())
            .then(json => {
                setChars(json);
            });
    }, [setChars]);

    return (
        <div className="keypad">
            { chars && chars.map(char => {
                const color = usedKeys[char.key];
                return (
                    <div key={ char.key } className={ color }> { char.key }</div>
                )
            }) }
        </div>
    )
}
