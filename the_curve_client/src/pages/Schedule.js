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
                </div>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Schedule;