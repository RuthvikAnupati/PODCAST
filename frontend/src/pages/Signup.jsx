import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage';

const Signup = () => { 
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();   
    const [Values, setValues] = useState({
        username:"", 
        email:"", 
        password:"",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Values, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:1000/api/v1/sign-up", Values);
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <> 
            { 
                isLoggedIn ? <ErrorPage /> : (
                    <div className='h-screen bg-green-100 flex items-center justify-center'>
                        <ToastContainer position="top-center" draggable />
                        <div className='w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center'>
                            <Link to="/" className='text-2xl font-bold text-center'>
                                PODCASTER
                            </Link>
                            <div className='mt-6 w-full'>
                                <div className='w-full flex flex-col font-semibold'>
                                    <label htmlFor="">Username</label>
                                    <input 
                                        type="text" className='mt-2 px-2 py-2 rounded outline-none border-2 border-black'
                                        required placeholder='Username' name='username' value={Values.username} onChange={change}
                                    />
                                </div>
                                <div className='w-full flex flex-col font-semibold mt-4'>
                                    <label htmlFor="">Email</label>
                                    <input 
                                        type="email" className='mt-2 px-2 py-2 rounded outline-none border-2 border-black'
                                        required placeholder='Email' name='email' value={Values.email} onChange={change}
                                    />
                                </div>
                                <div className='w-full flex flex-col font-semibold mt-4'>
                                    <label htmlFor="">Password</label>
                                    <input 
                                        type="password" className='mt-2 px-2 py-2 rounded outline-none border-2 border-black'
                                        required placeholder='Password' name='password' value={Values.password} onChange={change}
                                    />
                                </div>
                                <div className='w-full flex flex-col font-semibold mt-6'>
                                    <button 
                                        className='bg-green-900 font-semibold text-xl text-white rounded py-2'
                                        onClick={handleSubmit}
                                    >
                                        Signup
                                    </button>
                                </div>
                                <div className='w-full flex flex-col mt-6'>
                                    <p className='text-center font-semibold'>
                                        Already have an account?{" "}
                                        <Link to="/login" className='font-bold hover:text-blue-700'>
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Signup;
