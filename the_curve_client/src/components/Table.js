//----- IMPORTS -----
import { useEffect, useState } from 'react';
// import useGetFetch from '../functionality/useGetFetch';
// import useDeleteFetch from '../functionality/useDeleteFetch';
import GetFetch from '../functionality/GetFetch';
import DeleteFetch from '../functionality/DeleteFetch';

const Table = ({ titles, type }) => {

    const url = 'http://localhost:3000/' + type;

    // Establish useState hooks for the form input values
    const [values, setValues] = useState([]);

    // Fetch all existing values
    // setValues(useGetFetch(url));
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetFetch(url);
            setValues(data);
        };

        fetchData();
    }, [url]);

    const handleClick = (valueId) => {

        DeleteFetch(url, valueId);

        // Update the values by filtering out the deleted value
        values = values.filter(value => value.id !== valueId);
    }

    return (
        <div className='table-container'>
            {values.length > 0 && (<table>
                <thead>
                    <tr>
                        {titles.map((title) => (
                            <th key={title}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {values.map((value) => (
                        <tr key={'tr:' + value.id}>
                            <td key={'name:' + value.id}>{value.name}</td>
                            {value.course && <td key={'course: ' + value.id}>{value.course}</td>}
                            {value.created && <td key={'created: ' + value.id}>{value.created.slice(0, 10)}</td>}
                            <td key={'delete' + value.id} onClick={() => handleClick(value.id)}>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
            {values.length === 0 && <span>Det finns ingen lagrad data.</span>}
        </div>
    );
}

export default Table;