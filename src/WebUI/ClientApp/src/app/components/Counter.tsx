import React, {useEffect, useState} from 'react';
import {DesksClient, PaginatedListDeskDto} from "../api/web-client";
import axios, {AxiosInstance} from "axios";

interface ICounter {
    currentCount: number
}


export default function Counter() {
    const [counter, setCounter] = useState<ICounter>({currentCount: 0})
    const [desks, setDesks] = useState< {items:PaginatedListDeskDto[] | undefined}>({items: undefined})

    useEffect(() => {
        const instance: AxiosInstance = axios.create({transformResponse: data => data});
        const client = new DesksClient(undefined, instance);
        client.listDesks(10, 1).then((res) => setDesks({items: res.items}))
    }, []);

    function incrementCounter() {
        setCounter({
            currentCount: counter.currentCount + 1
        });
    }


    return (
        <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>
            <p>{JSON.stringify(desks.items)}</p>

            <p aria-live="polite">Current count: <strong>{counter.currentCount}</strong></p>

            <button className="btn btn-primary" onClick={() => incrementCounter()}>Increment</button>
        </div>
    );
}
