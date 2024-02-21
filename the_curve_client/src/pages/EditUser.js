// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useState, useEffect } from 'react';
import FetchGet from '../functionality/FetchGet';
import { useNavigate, Link } from 'react-router-dom';
import FetchPatch from '../functionality/FetchPatch';

const EditUser = () => {

    // Check token 
    CheckToken();

    // Establish hooks
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const url = 'http://localhost:3000/users';

    // Fetch the existing data for the user
    useEffect(() => {
        const fetchData = async () => {
            try {

                // Fetch data from lesson
                const data = await FetchGet(url);

                // Set data for the established hooks
                setFirstname(data.firstname);
                setLastname(data.lastname);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

    }, [url]);

    // Create the body for the patch request
    const body = { 'firstname': firstname, 'lastname': lastname, 'password': password };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Try to send a patch request
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
                <h1>Edit user</h1>
                <form className="big-form" onSubmit={handleSubmit}>
                    <legend>Write user details</legend>
                    {message && <span className='error-message'>{message}</span>}
                    <div className="label-input-container">
                        <label htmlFor="firstname">First name</label>
                        <input
                            type="text"
                            required
                            name="firstname"
                            id="firstname"
                            value={firstname}
                            onChange={event => setFirstname(event.target.value)}
                        />
                        <label htmlFor="lastname">Last name</label>
                        <input
                            type="text"
                            required
                            name="lastname"
                            id="lastname"
                            value={lastname}
                            onChange={event => setLastname(event.target.value)}
                        />
                        <label htmlFor="password">Write your password to verify your identity</label>
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

export default EditUser;