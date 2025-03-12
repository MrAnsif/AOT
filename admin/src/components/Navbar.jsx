import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-2  border-b-zinc-300 fixed top-0 left-0 w-full backdrop-blur-sm'>
            <div className='flex items-center gap-2 text-xs '>
                <img src={assets.admin_logo} alt="" className='h-17' />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-[#0A48A8] text-white text-sm px-9 py-2 rounded-full '>Logout</button>
        </div>
    )
}

export default Navbar