// ----- IMPORTS -----

// Components
import Aside from "../components/Aside";

// Functionality
import { useEffect, useState } from 'react';

const Create = () => {

    const url = 'http://localhost:3000/courses';
    const token = localStorage.getItem('token');

    // Establish useState hooks for the form input values
    const [courseName, setCourseName] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [courseList, setCourseList] = useState([]);

    // Fetch all existing courses
    useEffect(() => {
        fetch(url, {
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

    // Handle the submit event when users try to submit new course
    const handleCourseSubmit = (event) => {
        setIsPending(true);

        // Prevent reload of the page when pressing the submit button
        event.preventDefault();

        // Establish arguments for the fetch command
        const input = { 'name': courseName };

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
            })
            .catch((err) => {
                setIsPending(false);
                console.log(err.message);
            })
    }

    const handleLessonSubmit = (event) => {
        setIsPending(true);

        // Prevent reload of the page when pressing the submit button
        event.preventDefault();

        // Establish arguments for the fetch command
        const input = {
            'name': lessonName,
            'description': description,
            'subject': {
                'subjectName': course,
                'subjectId': '-'
            }
        };

        // Run a fetch command to post the data to the API and save it
        fetch('http://localhost:3000/lessons', {
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
                console.log(data);
            })
            .catch((err) => {
                setIsPending(false);
                console.log(err.message);
            })
    }

    return (
        <div id='page-content'>
            <main>
                <h1>The Curve</h1>
                <form className="vertical-form" onSubmit={handleCourseSubmit}>
                    <legend>Add Course</legend>
                    <div className="vertical-container">
                        <div className="label-input-container">
                            <label htmlFor="course-name">Name</label>
                            <input type="text"
                                required
                                name="course-name"
                                id="course-name"
                                value={courseName}
                                onChange={event => setCourseName(event.target.value)}
                            />
                        </div>

                        {!isPending && <button>Add</button>}
                        {isPending && <button disabled>Add</button>}
                    </div>
                </form>

                <form className="big-form">
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
                        {courseList.map(course => (
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

export default Create;