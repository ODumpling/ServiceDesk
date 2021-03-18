import React, {useState} from 'react';

interface ICounter {
    currentCount: number
}


export default function Counter() {
    const [counter, setCounter] = useState<ICounter>({currentCount: 0})


    function incrementCounter() {
        setCounter({
            currentCount: counter.currentCount + 1
        });
    }


    return (
        <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p aria-live="polite">Current count: <strong>{counter.currentCount}</strong></p>

            <button className="btn btn-primary" onClick={() => incrementCounter()}>Increment</button>
        </div>
    );
}
