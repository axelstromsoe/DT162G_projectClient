// ----- IMPORTS -----
import { useState } from 'react';

const Login = (url, body) => {

    // Establish hooks
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(body)
    })
        .then((repsonse) => repsonse.json())
        .then((data) => {
            setLoading(false);

            // Check if the login request is successfull
            if (data.logged_in) {
                // Returning the 
            }
        })
        .catch((error) => console.error(error));

    return (null);
}

export default Login;