// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useState, useEffect } from 'react';
import FetchGet from '../functionality/FetchGet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FetchPatch from '../functionality/FetchPatch';

const EditLesson = () => {

    // Check token 
    CheckToken();

    // Fecth id from url
    const { id } = useParams();

    // Establish hooks
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const url = 'http://localhost:3000/lessons';


    useEffect(() => {
        const fetchData = async () => {
            try {

                // Fetch data from lesson
                const data = await FetchGet(url + '/' + id);

                // Set data for the established hooks
                setName(data.name);
                setCourse(data.course);
                setDescription(data.description);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

    }, [url]);


    const body = { 'name': name, 'course': course, 'description': description };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Try to patch lesson to DB
        const data = await FetchPatch(url + '/' + id, body);
        setLoading(false);

        if (data.created) {
            navigate('/lessons')
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div id="page-content">
            <main>
                <h1>Edit lesson</h1>
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

export default EditLesson;