const DeleteFetch = (url, id) => {
    const token = localStorage.getItem('token');

    // Run a fetch command to delete the course
    fetch((url + '/' + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/JSON',
            'Authorization': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        })
}
 
export default DeleteFetch;