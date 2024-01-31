//----- IMPORTS -----
import { useState, useEffect } from 'react';

const useGetFetch = async (url) => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/JSON',
                        'Authorization': token
                    }
                });

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
}

export default useGetFetch;