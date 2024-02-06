// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useState } from 'react';
import useFetchGet from '../functionality/useFetchGet';
import FetchDelete from '../functionality/FetchDelete';

const Lessons = () => {

    // Check token
    CheckToken();

    const url = 'http://localhost:3000/lessons';

    // Establish hooks
    const { data, isLoading, error } = useFetchGet(url);


    const handleClick = async (id) => {
        
        // Delete lesson from DB
        FetchDelete(url, id);

        // Hide table row
        const trEl = document.getElementById(id);
        trEl.style.display = 'none';
    }

    return (
        <div id='page-content'>
            <main>
                <h1>Schedule</h1>
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
                                    <td className='table-button' key={'edit' + lesson.id} onClick={() => handleClick(lesson.id)}>Edit</td>
                                    <td className='table-button' key={'delete' + lesson.id} onClick={() => handleClick(lesson.id)}>Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Lessons;