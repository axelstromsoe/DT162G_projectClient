// ----- IMPORTS -----
import { useState, useEffect } from 'react';

const useFetchGet = (url) => {

    const token = localStorage.getItem('token');

    // Establish hooks
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url]);
    
    return {data, loading, error};
}
 
export default useFetchGet;