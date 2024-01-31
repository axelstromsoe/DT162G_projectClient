// ----- IMPORTS -----
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    // Hiding menu button
    useEffect(() => {
        let menuButtonEl = document.getElementById('menu-button');
        if (menuButtonEl) { menuButtonEl.style.display = 'none' };
    }, []);


    // Establishing useState hooks for username, password, output and isPending
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    // Handle the submit event when users try to login
    const handleSubmit = (event) => {
        setIsPending(true);

        // Prevent reload of the page when pressing the submit button
        event.preventDefault();

        // Establish arguments for the fetch command
        const url = 'http://localhost:3000/users/login';
        const input = { 'username': username, 'password': password };

        // Run a fetch command to post the data to the API and save it
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            body: JSON.stringify(input)
        })
            .then((res) => res.json())
            .then((data) => {
                setIsPending(false);

                // Check if the login resquest where successfull
                if (data.logged_in) {
                    // Saving the token and username to the local storage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', username);

                    // Displaying menu button
                    let menuButtonEl = document.getElementById('menu-button');
                    if (menuButtonEl) { menuButtonEl.style.display = 'flex' };

                    // Navigate to index page
                    navigate('/');
                } else {
                    // Setting the message message
                    setMessage(data.message);
                }
            })
            .catch((err) => {
                setIsPending(false);
                console.log(err.message);
            })
    }

    return (
        <main id='login-main'>
            <form className="small-form" onSubmit={handleSubmit}>
                <legend>Write username and password</legend>
                {message && <span className='error-message'>{message}</span>}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    required
                    name="username"
                    id="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <div className="form-button-container">
                    <Link>Sign up</Link>
                    <button className='login-button'>Log in</button>
                </div>
            </form>
        </main>
    );
}

export default Login;