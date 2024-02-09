// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useState } from 'react';
import useFetchGet from '../functionality/useFetchGet';

const Schedule = () => {

    // Check token
    CheckToken();

    const url = 'http://localhost:3000/lessons';

    // Establish hooks
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const { data, isLoading, error } = useFetchGet(url);

    const handleClick = (type) => {

        // Establish new date
        const newDate = new Date(date);

        // Add one day to the new date
        if (type === 'decrease') {
            newDate.setDate(newDate.getDate() - 1)
        } else {
            newDate.setDate(newDate.getDate() + 1);
        };

        // Set the new date as the value in the date hook
        setDate(newDate.toISOString().split('T')[0]);
    }

    // Filter the lessons according to the date
    let lessons;

    if (data) {
        lessons = data.filter((lesson) => { return lesson.created.split('T')[0] === date; })
    }

    const checkLesson = (id) => {

        // Get element
        const checkboxElement = document.getElementById('checkbox-circle-' + id);
        const lessonInfoElement = document.getElementById('lesson-info-' + id);

        // Add och remove attribute
        if (checkboxElement.className === 'checkbox-circle-incomplete') {
            checkboxElement.classList.remove('checkbox-circle-incomplete');
            lessonInfoElement.classList.remove('lesson-info-incomplete');
            checkboxElement.classList.add('checkbox-circle-completed');
            lessonInfoElement.classList.add('lesson-info-completed');
        } else {
            checkboxElement.classList.remove('checkbox-circle-completed');
            lessonInfoElement.classList.remove('lesson-info-completed');
            checkboxElement.classList.add('checkbox-circle-incomplete');
            lessonInfoElement.classList.add('lesson-info-incomplete');
        };
    }

    return (
        <div id='page-content'>
            <main>
                <h1>Schedule</h1>
                <div id="toggle-button-container">
                    <button className='schedule-button' onClick={() => handleClick('decrease')}>Previous</button>
                    <button className='schedule-button' onClick={() => handleClick('increase')}>Next</button>
                </div>
                <div id="schedule-container">
                    <div id="schedule-header">
                        <h2>{date}</h2>
                    </div>
                    {data && lessons.map((lesson) => (
                        <div className='lesson-container' key={'lesson-container-' + lesson.id}>
                            <div className='checkbox' key={'checkbox-' + lesson.id}>
                                <div className='checkbox-circle-incomplete' key={'checkbox-circle-' + lesson.id} id={'checkbox-circle-' + lesson.id} onClick={() => checkLesson(lesson.id)}></div>
                            </div>
                            <span className='lesson-info-incomplete' key={'lesson-info-' + lesson.id} id={'lesson-info-' + lesson.id}>{lesson.name + ' - ' + lesson.course}</span>
                        </div>
                    ))}
                </div>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Schedule;