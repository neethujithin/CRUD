import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUsers() {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/getUser/${id}`)
            .then(res => {
                // populate form with res.data
                console.log(res.data);
                setName(res.data.name);
                setEmail(res.data.email);
                setAge(res.data.age);
            })
            .catch(err => console.log(err));
    }, [id]);


    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/updateUser/${id}`, { name, email, age })
            .then(result => {
                navigate('/');
                console.log(result);
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">     <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update User</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className='me-5' >Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Enter name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='form-control'
                    />

                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='me-5'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter Email'
                        required
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="age" className='me-5'>Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder='Enter Age'
                        required
                        min="1"
                        className='form-control'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Update
                </button>
            </form>

        </div> </div>
    )
}

export default UpdateUsers