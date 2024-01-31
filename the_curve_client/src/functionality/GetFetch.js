const GetFetch = async (url) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            }
        });

        const data = await response.json();
        return data;
    } catch(error) {

        console.error(error);
        return null;
    }
}
 
export default GetFetch;