// ----- IMPORTS -----
import { useNavigate, Link } from 'react-router-dom';

const Aside = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        // Run the asideInteraction function
        asideInteraction();

        // Logging out the user by deleteing the token and redirecting to the logging page
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    }

    const asideInteraction = () => {
        // Get elements, remove the class and change the style
        const menuButton = document.getElementById('menu-button');
        const asideEl = document.getElementById('aside');
        menuButton.removeAttribute('class');
        asideEl.style.transform = 'translateX(300px)';
    }

    return (
        <aside id="aside">
            <div id="profile-container">
                <span>{localStorage.getItem('username')}</span>
                <button className="login-button" onClick={handleClick}>Log out</button>
            </div>
            <nav>
                <ul>
                    <li><Link to='/lessons' onClick={asideInteraction}>LESSONS</Link></li>
                    <li><Link to='' onClick={asideInteraction}>SUPPORT</Link></li>
                </ul>
            </nav>
        </aside>
    );
}
 
export default Aside;