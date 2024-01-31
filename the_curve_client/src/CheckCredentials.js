// ----- IMPORTS -----
import { useNavigate } from "react-router-dom";

const CheckCredentials = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Fetch data from the user
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/JSON',
            'Authorization': token
        }
    })
        .then((response) => {
            // Sending the user back to the login page if the token is incorrect or does not exist
            if (!response.ok) {
                navigate('/login');
            }
        })
        .catch((error) => {
            console.error(error);
            navigate('/login');
        });
}
 
export default CheckCredentials;