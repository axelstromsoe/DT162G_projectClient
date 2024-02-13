// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useEffect, useState } from 'react';
import FetchPatch from '../functionality/FetchPatch';
import FetchGet from '../functionality/FetchGet';

const Index = () => {

    // Check token
    CheckToken();

    const url = 'http://localhost:3000/lessons';

    // Establish hooks
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchGet(url);

                if (data.message) {
                    setData(null);
                } else {
                    setData(data);
                }
            } catch (error) {
                console.log(error);
                setData(null);
            }
        };

        fetchData();
    }, [date]);

    let lessons;

    if (data) {

        // Create arrays with desired repetitions pattern and for the repetition dates
        const datePattern = [1, 4, 7, 14, 28];
        const repetitionDates = datePattern.map((i) => {
            const repetitionDate = new Date(date);
            repetitionDate.setDate(repetitionDate.getDate() - i);
            return repetitionDate.toISOString().split('T')[0];
        });

        // Filter the lessons according to the dates
        lessons = data.filter((lesson) => { return repetitionDates.includes(lesson.created.split('T')[0]) });
    }

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

    const checkLesson = (id) => {

        // Get elements
        const checkboxElement = document.getElementById('checkbox-circle-' + id);
        const lessonInfoElement = document.getElementById('lesson-info-' + id);

        // Get the lesson and time diffrence
        const lesson = data.find((lesson) => lesson.id === id);
        const timeDifference = getTimeDifference(lesson);

        let body;

        if (checkboxElement.className === 'checkbox-circle-incomplete') {

            // Change the attribute for the elements
            checkboxElement.classList.remove('checkbox-circle-incomplete');
            lessonInfoElement.classList.remove('lesson-info-incomplete');
            checkboxElement.classList.add('checkbox-circle-completed');
            lessonInfoElement.classList.add('lesson-info-completed');

            // Establish the body for a patch request and the updated version of the lesson
            switch (timeDifference) {
                case 1:
                    body = { 'repetitions': { 'first': 'completed' } };
                    break;
                case 4:
                    body = { 'repetitions': { 'second': 'completed' } };
                    break;
                case 7:
                    body = { 'repetitions': { 'third': 'completed' } };
                    break;
                case 14:
                    body = { 'repetitions': { 'forth': 'completed' } };
                    break;
                case 28:
                    body = { 'repetitions': { 'fifth': 'completed' } };
                    break;
                default:
                    break;
            }

        } else {

            // Change the attribute for the elements
            checkboxElement.classList.remove('checkbox-circle-completed');
            lessonInfoElement.classList.remove('lesson-info-completed');
            checkboxElement.classList.add('checkbox-circle-incomplete');
            lessonInfoElement.classList.add('lesson-info-incomplete');

            // Establish the body for a patch request
            switch (timeDifference) {
                case 1:
                    body = { 'repetitions': { 'first': 'incomplete' } };
                    break;
                case 4:
                    body = { 'repetitions': { 'second': 'incomplete' } };
                    break;
                case 7:
                    body = { 'repetitions': { 'third': 'incomplete' } };
                    break;
                case 14:
                    body = { 'repetitions': { 'forth': 'incomplete' } };
                    break;
                case 28:
                    body = { 'repetitions': { 'fifth': 'incomplete' } };
                    break;
                default:
                    break;
            }
        };

        // Patch the lesson in the database
        FetchPatch(url + '/' + id, body);
    };

    const getTimeDifference = (lesson) => {

        // Establish the current daste and the date when the lesson was created
        const currentDate = new Date(date);
        const createdDate = new Date(lesson.created);

        // Calculate the time diffrence between the dates in amount of days
        let timeDifference = Math.abs(createdDate - currentDate);
        timeDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return timeDifference;
    };

    const getRepetiton = (lesson) => {

        // Get time difference
        const timeDifference = getTimeDifference(lesson);

        // Return the value for the repetition
        switch (timeDifference) {
            case 1:
                return lesson.repetitions.first;
            case 4:
                return lesson.repetitions.second;
            case 7:
                return lesson.repetitions.third;
            case 14:
                return lesson.repetitions.forth;
            case 28:
                return lesson.repetitions.fifth;
            default:
                return null;
        };
    };

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
                                <div className={'checkbox-circle-' + getRepetiton(lesson)} key={'checkbox-circle-' + lesson.id} id={'checkbox-circle-' + lesson.id} onClick={() => checkLesson(lesson.id)}></div>
                            </div>
                            <span className={'lesson-info-' + getRepetiton(lesson)} key={'lesson-info-' + lesson.id} id={'lesson-info-' + lesson.id}>{lesson.name + ' - ' + lesson.course}</span>
                        </div>
                    ))}
                </div>
            </main>
            <Aside></Aside>
        </div>
    );
}
export default Index;