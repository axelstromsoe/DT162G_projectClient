// ----- IMPORTS -----
import { useState, useEffect } from 'react';

const UseFetchGet = (url, token = '') => {
    // Establishing useState hooks for output, isPending and error
    const [output, setOutput] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // Run fetch command to gather data from the server
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setOutput(data);
                setIsPending(false);
                setError(null);
            })
            .catch((error) => {
                setIsPending(false);
                setError(error.message);
            });
        }, [url, token]);

    return { output, isPending, error };
}

export default UseFetchGet;