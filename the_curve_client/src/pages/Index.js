// ----- IMPORTS -----

// Components
import ToolButtons from '../components/ToolButtons';
import Aside from '../components/Aside';

// Functionality
import CheckToken from '../functionality/CheckToken';

// ----- EXPORT -----
const Index = () => {

    // Check token 
    CheckToken();

    return (
        <div id='page-content'>
            <main>
                <h1>The Curve</h1>
                {/* <ToolButtons></ToolButtons> */}
            </main>
            <Aside></Aside>
        </div>
    );
}

export default Index;