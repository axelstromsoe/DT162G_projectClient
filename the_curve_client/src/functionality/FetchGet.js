const FetchGet = async (url) => {

    // Get token from local storage
    const token = localStorage.getItem('token');

    try {
        const repsonse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await repsonse.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
 
export default FetchGet;