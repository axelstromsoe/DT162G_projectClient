// ----- IMPORTS -----

// Components
import ToolButtons from '../components/ToolButtons'
import Aside from '../components/Aside';

// Functionality
import CheckCredentials from '../CheckCredentials';

// ----- EXPORT -----
const Index = () => {

    // Check if the user got credentials
    CheckCredentials();

    return (
        <div id='page-content'>
            <main>
                <h1>The Curve</h1>
                <ToolButtons></ToolButtons>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Index;