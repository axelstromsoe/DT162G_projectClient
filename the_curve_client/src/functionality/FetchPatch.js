const FetchPatch = async (url, body) => {

    // Get token from local storage
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
 
export default FetchPatch;