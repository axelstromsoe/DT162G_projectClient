// ----- IMPORTS -----

// Components
import Aside from "../components/Aside";

// Functionality
import CheckToken from "../functionality/CheckToken";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FetchPost from "../functionality/FetchPost";

const CreateLesson = () => {
    
    // Check token 
    CheckToken();

    // Establish hooks
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    // Establish url and body for the fetch
    const url = 'http://localhost:3000/lessons';
    const body = { 'name': name, 'course': course, 'description': description };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Try to post lesson to DB
        const data = await FetchPost(url, body);
        setLoading(false);

        // Check if the request was successfull
        if (data.created) {

            // Navigate the user to the lesson page
            navigate('/lessons')
        } else {

            // Set a messages
            setMessage(data.message);
        }
    }

    return (
        <div id="page-content">
            <main>
                <h1>Create lesson</h1>
                <form className="big-form" onSubmit={handleSubmit}>
                    <legend>Write lesson details</legend>
                    {message && <span className='error-message'>{message}</span>}
                    <div className="label-input-container">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            value={name}
                            onChange={event => setName(event.target.value)} />
                        <label htmlFor="course">Course</label>
                        <input
                            type="text"
                            required
                            name="course"
                            id="course"
                            value={course}
                            onChange={event => setCourse(event.target.value)} />

                        <label htmlFor="description">Beskrivning</label>
                        <textarea
                            required
                            name="description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}>
                        </textarea>
                    </div>
                    <div className="form-button-container">
                        <Link to={'/lessons'}>Cancel</Link>
                        {!loading && <button>Add</button>}
                        {loading && <button disabled>Add</button>}
                    </div>
                </form>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default CreateLesson;