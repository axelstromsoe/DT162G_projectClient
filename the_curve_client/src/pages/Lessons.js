// ----- IMPORTS -----

// Components
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';
import useFetchGet from '../functionality/useFetchGet';

const Lessons = () => {

    // Check token
    CheckToken();

    const url = 'http://localhost:3000/lessons';

    // Establish hooks
    const { data, isLoading, error } = useFetchGet(url);

    return (
        <div id='page-content'>
            <main>
                <h1>Schedule</h1>
                {data && data.map((lesson) => (
                    <div key={lesson.id}>{lesson.name}</div>
                ))}
            </main>
            <Aside></Aside>
        </div>
    );
}
 
export default Lessons;