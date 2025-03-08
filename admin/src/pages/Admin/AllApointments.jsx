import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4 sm:mb-6">All Appointments</p>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="hidden md:grid md:grid-cols-7 bg-gray-200 text-gray-700 font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-md mb-2">
            <p className="text-sm ">#</p>
            <p className="text-sm">Patient</p>
            <p className="text-sm">Age</p>
            <p className="text-sm">Date</p>
            <p className="text-sm">Doctor</p>
            <p className="text-sm">Fees</p>
            <p className="text-sm">Actions</p>
          </div>

          {/* Mobile Header - Only shown on small screens */}
          <div className="md:hidden bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md mb-2">
            <p className="text-sm">Appointments</p>
          </div>

          {/* Content Rows */}
          <div className="divide-y divide-gray-300">
            {appointments.map((item, index) => (
              <div key={index} className="md:grid md:grid-cols-7 py-3 sm:py-4 px-2 sm:px-4 items-center text-gray-600 bg-white hover:bg-gray-100 rounded-md mb-2 flex flex-wrap">
                <p className="text-sm w-full md:w-auto mb-1 md:mb-0">{index + 1}</p>

                <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
                  <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-200" />
                  <p className="font-medium text-sm">{item.userData.name}</p>
                </div>

                <p className="text-sm w-full md:w-auto mb-1 md:mb-0">
                  <span className="md:hidden text-xs text-gray-500">Age: </span>
                  {calculateAge(item.userData.dob)}
                </p>

                <div className="w-full md:w-auto mb-2 md:mb-0">
                  <p className="text-sm">{slotDateFormat(item.slotDate)}</p>
                  <p className="text-xs text-gray-500">{item.slotTime}</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
                  <img className="w-8 h-8 rounded-full object-cover bg-gray-200" src={item.docData.image} alt="" />
                  <p className="text-sm">{item.docData.name}</p>
                </div>

                <p className="text-sm w-full md:w-auto mb-1 md:mb-0">
                  <span className="md:hidden text-xs text-gray-500">Fees: </span>
                  ₹{item.docData.fees}
                </p>
                {item.cancelled
                  ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                  :
                  <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllApointments