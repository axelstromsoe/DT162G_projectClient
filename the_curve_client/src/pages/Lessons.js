// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import useFetchGet from '../functionality/useFetchGet';
import FetchDelete from '../functionality/FetchDelete';
import { useNavigate } from 'react-router-dom';

const Lessons = () => {

    // Check token
    CheckToken();

    const navigate = useNavigate();

    const url = 'http://localhost:3000/lessons';

    // Establish hooks
    const { data, isLoading, error } = useFetchGet(url);

    const handleEdit = (id) => {

        // Navigate to the edit page
        navigate('/editlesson/' + id);
    }

    const handleDelete = async (id) => {

        // Delete lesson from DB
        FetchDelete(url, id);

        // Hide table row
        const trEl = document.getElementById(id);
        trEl.style.display = 'none';
    }

    return (
        <div id='page-content'>
            <main>
                <h1>lessons</h1>
                <div className="create-button-container">
                    <button className='create-button' onClick={() => navigate('/createlesson')}>Add new lesson</button>
                </div>
                {data &&
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((lesson) => (
                                <tr key={'tr:' + lesson.id} id={lesson.id}>
                                    <td key={'name:' + lesson.id}>{lesson.name}</td>
                                    {lesson.course && <td key={'course: ' + lesson.id}>{lesson.course}</td>}
                                    {lesson.created && <td key={'created: ' + lesson.id}>{lesson.created.slice(0, 10)}</td>}
                                    <td className='table-button' key={'edit' + lesson.id} onClick={() => handleEdit(lesson.id)}>Edit</td>
                                    <td className='table-button' key={'delete' + lesson.id} onClick={() => handleDelete(lesson.id)}>Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {isLoading && <span className='data-message'>Loading...</span>}
                {error && <span className='data-message'>No lessons found.</span>}
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Lessons;