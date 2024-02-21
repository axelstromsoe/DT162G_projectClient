// ----- IMPORTS -----
import { useState, useEffect } from 'react';

const useFetchGet = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get token from local storage
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw Error('Could not fetch the data for that resource')
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message);
            })
    }, [url]);

    return { data, isLoading, error };
}

export default useFetchGet;