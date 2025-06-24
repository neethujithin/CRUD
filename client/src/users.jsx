import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/getUsers")
            .then((response) => {
                setUsers(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/deleteUser/' + id)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex w-100 bg-secondary justify-content-center align-items-center'><div className='w-50 bg-white rounded p-3'>
            <Link to='create' className="btn btn-success">Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td> <Link to={`/update/${user._id}`} className="btn btn-primary me-3">Update</Link>
                                <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div></div>
    )
}

export default Users