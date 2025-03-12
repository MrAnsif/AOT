import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Calendar, Clock, FileText, User, X } from 'lucide-react';


const DoctorDashboard = () => {

  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }

  }, [dToken])



  return dashData && (
    <div className='h-[160vh] overflow-y-scroll'>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Doctors Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <img src={assets.earning_icon} alt="Doctors" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">₹{dashData.earnings}</p>
                <p className="text-gray-600 font-medium mt-1">Earnings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-4 rounded-xl">
                <img src={assets.appointments_icon} alt="Appointments" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{dashData.appointments}</p>
                <p className="text-gray-600 font-medium mt-1">Appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-4 rounded-xl">
                <img src={assets.patients_icon} alt="Patients" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">{dashData.patients}</p>
                <p className="text-gray-600 font-medium mt-1">Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <img src={assets.list_icon} alt="" className="w-6 h-6" />
          <h2 className="text-xl font-bold text-gray-800">Latest Bookings</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.userData.name}</p>
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{slotDateFormat(item.slotDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.slotTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              {
                item.cancelled
                  ?
                  <p className='text-red-500 font-medium'>Cancelled</p>
                  : item.isCompleted
                    ?
                    <p className='text-green-500 font-medium'>Completed</p>
                    :
                    <div className='flex '>
                      <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='cursor-pointer' />
                      <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="" className='cursor-pointer' />
                    </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard