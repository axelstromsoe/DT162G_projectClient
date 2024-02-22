// ----- IMPORTS -----

// Components
import Aside from "../components/Aside";

// Functionality
import CheckToken from '../functionality/CheckToken';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    // Check token 
    CheckToken();

    const navigate = useNavigate();

    const handleClick = () => {

        // Navigate user back to the homepage
        navigate('/');
    }

    return (
        <div id="page-content">
            <main>
                <h1>Sorry, this page does not exist!</h1>
                <p>The resource for this url cannot be found.</p>
                <div id="homepage-button-container">
                    <button id="homepage-button" onClick={handleClick}>Go to homepage</button>
                </div>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default NotFound;