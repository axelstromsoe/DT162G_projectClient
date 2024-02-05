// ----- IMPORTS -----
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchGet from "./FetchGet";

const CheckToken = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from user
            const data = await FetchGet('http://localhost:3000/users');

            if (!data.token_valid) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return null;
}

export default CheckToken;