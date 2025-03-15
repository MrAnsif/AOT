import { assets } from '@/assets/assets'
import React from 'react'





const Footer = () => {


    return (
        <div className="h-screen  relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            <div className='h-[100%] fixed bottom-0 flex items-end bg-black  '>
                <div className="text-white absolute h-[50%] left-1/4 top-1/4 lg:translate-x-36">
                    <h1 className='text-2xl bg-gradient-to-r from-white to-[#565656] bg-clip-text tracking-tight'>AOT – Your Health Clock, Perfectly Synced.</h1>
                </div>

                <footer className='w-screen  py-4 text-white h-auto '>
                    <div className='flex flex-col justify-between p-2 gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-1 text-sm'>
                        {/* ========left======== */}
                        <div className="">
                            <img className='mb-5 h-20 bg-[#EFF5EE] rounded-lg' src={assets.logo} alt="" />
                            <p className='w-full md:w-2/3 '>Your health is our priority. Book appointments with trusted doctors, access personalized care, and manage your medical needs conveniently, all in one place. </p>
                        </div>
                        {/* =======centre======== */}
                        {/* <div className="">
                            <p className='text-xl font-medium mb-3'>COMPANY</p>
                            <ul className='flex flex-col gap-1'>
                                <li>Home</li>
                                <li>About us</li>
                                <li>Contact us</li>
                                <li>Privacy policy</li>
                            </ul>
                        </div> */}
                        {/* =====right======== */}
                        <div className="">
                            <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>
                            <ul className='flex flex-col gap-1'>
                                <li>+123-456-7890</li>
                                <li>example@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    {/* ======copyright======== */}
                    <div className="">
                        <hr />
                        <p className='pt-3 text-sm text-center'>Copyright 2025@ AOT - All right Reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer