const FetchDelete = async (url, id) => {

    // Get token from local storage
    const token = localStorage.getItem('token');

    try {
        const response = await fetch((url + '/' + id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default FetchDelete;