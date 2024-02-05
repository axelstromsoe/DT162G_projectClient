// ----- IMPORTS -----
import { useState, useEffect } from 'react';

const useFetchPost = (url, body) => {

    const token = localStorage.getItem('token');

    // Establish hooks
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.error(error));

    },[url])

    return ( null );
}
 
export default useFetchPost;