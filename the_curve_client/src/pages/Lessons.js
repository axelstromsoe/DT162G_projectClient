// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import { useEffect, useState } from 'react';


const Lessons = () => {


    const url = 'http://localhost:3000/lessons';
    const token = localStorage.getItem('token');

    // Establish useState hooks for the form input values
    const [lessonName, setLessonName] = useState('');
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [courseList, setCourseList] = useState([]);


    // Fetch all existing courses
    useEffect(() => {
        fetch('http://localhost:3000/courses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCourseList(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        setIsPending(true);

        // Prevent reload of the page when pressing the submit button
        event.preventDefault();

        // Establish arguments for the fetch command
        const input = {
            'name': lessonName,
            'description': description,
            'course': course,
        };

        // Run a fetch command to post the data to the API and save it
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            },
            body: JSON.stringify(input)
        })
            .then((res) => res.json())
            .then((data) => {
                setIsPending(false);

                // Update the lessonList by adding the new lesson
                // setLessonList([{ id: data._id, name: data.name, description: data.description, course: data.course, created: data.created }, ...lessonList]);
            })
            .catch((err) => {
                setIsPending(false);
                console.log(err.message);
            })
    }

    return (
        <div id="page-content">
            <main>
                <form className="big-form" onSubmit={handleSubmit}>
                    <legend>Add lesson</legend>
                    <label htmlFor="lesson-name">Name</label>
                    <input
                        type="text"
                        required
                        name="lesson-name"
                        id="lesson-name"
                        value={lessonName}
                        onChange={event => setLessonName(event.target.value)} />
                    <label htmlFor="course">Course</label>
                    <select
                        required
                        name="course"
                        id="course"
                        value={course}
                        onChange={event => setCourse(event.target.value)}>
                        <option key="uncategorized" value="uncategorized">uncategorized</option>
                        {courseList.length > 0 && courseList.map(course => (
                            <option key={course.id} value={course.name}>{course.name}</option>
                        ))}
                    </select>

                    <label htmlFor="description">Beskrivning</label>
                    <textarea
                        required
                        name="description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}></textarea>

                    <div className="form-button-container">
                        <button>Add</button>
                    </div>
                </form>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Lessons;