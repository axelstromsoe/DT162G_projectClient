const FetchDelete = async (url, id = null, body = {}) => {

    // Get token from local storage
    const token = localStorage.getItem('token');

    // Add parameter to url if id is added
    if (id) {
        url = url + '/' + id;
    };

    try {
        const response = await fetch((url), {
            method: 'DELETE',
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

export default FetchDelete;