// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FetchPatch from '../functionality/FetchPatch';

const ChangePassword = () => {

    // Check token 
    CheckToken();

    // Establish hooks
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const url = 'http://localhost:3000/users';

    // Create the body for the patch request
    const body = { 'password': password, 'new_password': newPassword };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Check if the password and password check is the same
        if (newPassword !== passwordCheck) {
            setMessage('The passwords does not match.')
            return null;
        }

        // Try to patch user
        const data = await FetchPatch(url, body);
        setLoading(false);

        // Check if the request was successful
        if (data.created) {
            navigate('/profile')
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div id="page-content">
            <main>
                <h1>Change password</h1>
                <form className="big-form" onSubmit={handleSubmit}>
                    <legend>Write new password</legend>
                    {message && <span className='error-message'>{message}</span>}
                    <div className="label-input-container">
                        <label htmlFor="new-password">Write new password</label>
                        <input
                            type="password"
                            required
                            name="new-password"
                            id="new-password"
                            value={newPassword}
                            onChange={event => setNewPassword(event.target.value)}
                        />
                        <label htmlFor="password-check">Write new password again</label>
                        <input
                            type="password"
                            required
                            name="password-check"
                            id="password-check"
                            value={passwordCheck}
                            onChange={event => setPasswordCheck(event.target.value)}
                        />
                        <label htmlFor="password">Write your old password to verify your identity</label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-button-container">
                        <Link to={'/profile'}>Cancel</Link>
                        {!loading && <button>Save</button>}
                        {loading && <button disabled>Save</button>}
                    </div>
                </form>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default ChangePassword;