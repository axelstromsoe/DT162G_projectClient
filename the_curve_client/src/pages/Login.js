// ----- IMPORTS -----
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FetchPost from "../functionality/FetchPost";

const Login = () => {

    // Hide the menu button
    useEffect(() => {
        if (document.getElementById('menu-button')) { document.getElementById('menu-button').style.display = 'none' };
    }, []);

    // Establish hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const url = 'http://localhost:3000/users/login';
    const body = { 'username': username, 'password': password };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Try to log in the user
        const data = await FetchPost(url, body);
        setLoading(false);

        // Check if the request is successfull
        if (data.logged_in) {

            // Set message
            setMessage(null);

            // Save token and username to local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);

            // Displaying menu button
            if (document.getElementById('menu-button')) { document.getElementById('menu-button').style.display = 'flex' };

            // Navigate to index page
            navigate('/');
            
        } else {

            // Set message
            setMessage(data.message);
        }
    }

    return (
        <div id="page-content">
            <main id="login-main">
                <form className="small-form" onSubmit={handleSubmit}>
                    <legend>Write your username and password</legend>
                    {message && <span className='error-message'>{message}</span>}
                    <div className='label-input-container'>
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
                    </div>
                    <div className="form-button-container">
                        <Link to={'/signup'}>Sign up</Link>
                        {!loading && <button className='login-button'>Log in</button>}
                        {loading && <button className='login-button' disabled>Log in</button>}
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Login;