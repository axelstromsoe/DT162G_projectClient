// ----- IMPORTS -----
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    // Establishing a useState hook for the menu button class
    const [menuClass, setMenuClass] = useState('closed');

    function manageClick() {
        // Get the aside element
        const asideEl = document.getElementById('aside');

        // Manipulate the style of the aside element according to the menu button class
        if (menuClass === 'closed' && asideEl) {
            asideEl.style.transform = 'translateX(0)';
            setMenuClass('open');
        } else if (menuClass === 'open' && asideEl) {
            asideEl.style.transform = 'translateX(300px)';
            setMenuClass('closed')
        }
    }

    return (
        <header>
            <Link to={'/'} id="logo-container">
                    <span>the curve</span>
            </Link>
            <div id="menu-button" onClick={manageClick} className={menuClass}>
                <div id="line"></div>
            </div>
        </header>
    );
}

export default Header;