import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/ADminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }

  }, [aToken])


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          doctors.map((item, index) => (
            <div key={index} className=" p-4 rounded-lg shadow-md corsor-pointer ">
              <img src={item.image} alt="" className="w-full h-48 object-cover rounded-t-lg group hover:bg-[#0a48a8] transition-all duration-500 " />
              <div className="mt-4">
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
                <div className="flex items-center mt-2">
                  <input type="checkbox" checked={item.available} className="mr-2" />
                  <p className="text-sm">Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList