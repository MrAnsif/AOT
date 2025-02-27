import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)


  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div className="">
        {doctors.slice(0, 2).map((item, index) => (
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, may, 2025 | 8:30 PM</p>
            </div>
            <div className=""></div>
            <div className="flex flex-col gap-2 justify-center">
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-lg" />
                <div className="px-8 py-2  bg-white rounded-[6px]  relative group transition duration-200 text-black hover:bg-transparent">
                  Pay online
                </div>
              </button>
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-orange-500 rounded-lg" />
                <div className="px-8 py-2  bg-white rounded-[6px]  relative group transition duration-200 text-black hover:bg-transparent">
                  Cancel appointment
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments