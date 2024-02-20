// ----- IMPORTS -----

// Components
import Aside from "../components/Aside";

// Functionality
import useFetchGet from "../functionality/useFetchGet";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FetchDelete from '../functionality/FetchDelete';

const Profile = () => {

    // Establish hooks
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Establish variables
    const url = 'http://localhost:3000/users';
    const navigate = useNavigate();
    const dialogEl = document.getElementById('dialog');
    const body = { password: password };

    // Fetch the data from the user
    const { data, isLoading, error } = useFetchGet(url)

    const handleEdit = () => {
    }

    const initDelete = () => {
        dialogEl.showModal();
    }

    const handleDelete = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Try to delete the user
        const data = await FetchDelete(url, null, body);
        setLoading(false);

        // Check if the request was successful
        if (data.deleted) {

            // Set message
            setMessage(null);

            dialogEl.close();

            // Removing the token and username and returning the user to the login page
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
        } else {

            // Set message
            setMessage(data.message);
        }
    }

    return (
        <div id='page-content'>
            <main>
                <h1>Profile</h1>
                <div id="user-info-container">
                    <h2>User information</h2>
                    {data && <ul>
                        <li><span>name: </span>{data.firstname + ' ' + data.lastname}</li>
                        <li><span>username: </span>{data.username}</li>
                        <li><span>email: </span>{data.email}</li>
                    </ul>}
                    {isLoading && <span>Loading...</span>}
                    {error && <span>{error}</span>}
                </div>
                <div id="user-info-button-container">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={initDelete}>Delete</button>
                </div>
                <dialog id="dialog">
                    <form onSubmit={handleDelete} className="small-form">
                        <legend>Are you sure you want to delete your account?</legend>
                        {message && <span className='error-message'>{message}</span>}
                        <div className="label-input-container">
                            <label htmlFor="password">Password</label>
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
                            <span onClick={() => { dialogEl.close() }}>Cancel</span>
                            {!loading && <button>Delete</button>}
                            {loading && <button disabled>Delete</button>}
                        </div>
                    </form>
                </dialog>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Profile;