import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import EmergencyCallButton from './Emergency'
import { AppContext } from '@/context/AppContext'
import GooeyNav from './GooeyNav/GooeyNav'

const Navbar = () => {

    const navigate = useNavigate()

    const { token, setToken, userData } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)
    // const [token, setToken] = useState(true)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    const items = [
        { label: "Home", to: "/" },
        { label: "All Doctors", to: "/doctors" }
    ];

    return (
        <div className='flex justify-between items-center py-4 text-sm mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className=' h-14 cursor-pointer' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-6 text-base font-medium'>
                {/* <NavLink to={'/'} >
                    <li className='py-1 '>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/doctors'} >
                    <li className='py-1 '>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink> */}

                <div style={{ height: '', position: 'relative' }}>
                    <GooeyNav
                        items={items}
                        animationTime={600}
                        particleCount={9}
                        minDistance={20}
                        maxDistance={42}
                        maxRotate={75}
                        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                        timeVariance={300}
                    />
                </div>

            </ul>

            <EmergencyCallButton />

            <div className='flex gap-4 items-center'>
                {
                    token && userData ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src={userData.image} alt="" />
                            <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                            <div className="absolute top-0 right-0 pt-14 text-base z-10 text-gray-600 font-medium rounded-lg hidden group-hover:block">
                                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                    <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white md:px-8 md:py-3 px-3 py-2 rounded-full font-light '>Signin</button>
                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0 '} md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all `}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <img className='w-36 ' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'> <p className='px-4 py rounded inline-block' >Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py rounded inline-block' >All Doctors</p></NavLink>
                        {/* <NavLink onClick={() => setShowMenu(false)} to='/blog'><p className='px-4 py rounded inline-block' >Blog Page</p></NavLink> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar