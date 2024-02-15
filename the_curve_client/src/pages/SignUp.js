// ----- IMPORTS -----
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FetchPost from "../functionality/FetchPost";

const Signup = () => {

    // Establish hooks
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    // Establish url and body for the fetch
    const url = 'http://localhost:3000/users';
    const body = {
        'firstname': firstname, 
        'lastname': lastname, 
        'email': email,
        'username': username,
        'password': password,
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Check if the password and password check is the same
        if (password != passwordCheck) {
            setMessage('The passwords does not match.')
            return null;
        }

        // Try to post lesson to DB
        const data = await FetchPost(url, body);
        setLoading(false);

        // Check if the request was successfull
        if (data.created) {

            // Navigate the user to the lesson page
            navigate('/login')
        } else {

            // Set a messages
            setMessage(data.message);
        }
    };

    return (
        <div id="page-content">
            <main>
                <h1>Sign up</h1>
                <form className="big-form" onSubmit={handleSubmit}>
                    <legend>Profile details</legend>
                    {message && <span className='error-message'>{message}</span>}
                    <div className="label-input-container">
                        <label htmlFor="firstname">First name</label>
                        <input
                            type="text"
                            required
                            name="firstname"
                            id="firstname"
                            value={firstname}
                            onChange={event => setFirstname(event.target.value)} />
                        <label htmlFor="lastname">Last name</label>
                        <input
                            type="text"
                            required
                            name="lastname"
                            id="lastname"
                            value={lastname}
                            onChange={event => setLastname(event.target.value)} />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)} />
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            required
                            name="username"
                            id="username"
                            value={username}
                            onChange={event => setUsername(event.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)} />
                        <label htmlFor="password-check">Write password again</label>
                        <input
                            type="password"
                            required
                            name="password-check"
                            id="password-check"
                            value={passwordCheck}
                            onChange={event => setPasswordCheck(event.target.value)} />
                    </div>
                    <div className="form-button-container">
                        <Link to={'/login'}>Cancel</Link>
                        {!loading && <button>Sign Up</button>}
                        {loading && <button disabled>Sign Up</button>}
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Signup;