import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendurl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendurl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post(backendurl + '/api/doctor/login', { email, password })

                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    console.log(data.token)
                }
                else {
                    toast.error(data.message)
                }

            }
        } catch (error) {

        }
    }



    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-20 bg-[#EFF5EE] p-6 rounded-lg shadow-md">
            <div className="text-center">
                <p className="text-2xl font-semibold mb-4">
                    <span className="text-blue-600">{state}</span> Login
                </p>
            </div>
            <div className="mb-4">
                <p className="text-gray-700 font-medium">Email</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-6">
                <p className="text-gray-700 font-medium">Password</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                className="w-full bg-[#163d77] text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Login
            </button>
            {
                state === 'Admin'
                    ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='underline cursor-pointer text-[#163d77]'>Click here</span></p>
                    : <p>Admin Login? <span onClick={() => setState('Admin')} className='underline cursor-pointer text-[#163d77]'>Click here</span></p>
            }
        </form>
    );
};

export default Login;
