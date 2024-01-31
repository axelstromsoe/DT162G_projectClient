// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';
import Table from '../components/Table';

// Functionality
import { useEffect, useState } from 'react';
import CheckCredentials from '../CheckCredentials';

const Courses = () => {

    // Check if the user got credentials
    CheckCredentials();

    const url = 'http://localhost:3000/courses';
    const token = localStorage.getItem('token');

    // Establish useState hooks for the form input values
    const [courseName, setCourseName] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [isPending, setIsPending] = useState(false);

    // Handle the submit event when users try to submit new course
    const handleClick = (event) => {
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

                // Update the courseList by adding the new course
                setCourseList([{ id: data._id, name: data.name }, ...courseList]);
            })
            .catch((err) => {
                setIsPending(false);
                console.log(err.message);
            })
    }

    return (
        <div id="page-content">
            <main>
                <h1>Courses</h1>
                <form className="vertical-form" onSubmit={handleClick}>
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
                <Table titles={['Name', '']} type={'courses'}></Table>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Courses;