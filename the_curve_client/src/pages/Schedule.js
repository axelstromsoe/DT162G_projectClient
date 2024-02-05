// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import useFetchGet from '../functionality/useFetchGet';

import { Link } from 'react-router-dom';

const Schedule = () => {

    // Check token
    CheckToken();

    const url = 'http://localhost:3000/lessons';

    // Establish hooks
    const { data, isLoading, error } = useFetchGet(url);

    return (
        <div id='page-content'>
            <main>
                <h1>Schedule</h1>
                <Link to={'/lessons'}>Lessons</Link>
            </main>
            <Aside></Aside>
        </div>
    );
}
 
export default Schedule;