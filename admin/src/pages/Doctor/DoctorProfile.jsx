import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendurl } = useContext(DoctorContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,

      }

      const { data } = await axios.post(backendurl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else{
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="bg-white shadow-md rounded-lg max-w-2xl mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 mx-auto md:mx-0">
          <img src={profileData.image} alt="" className="w-full h-full object-cover rounded-full shadow-lg" />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-2xl font-bold text-gray-800">{profileData.name}</p>
            <div className="my-2">
              <p className="text-gray-600 font-medium">{profileData.degree} - {profileData.speciality}</p>
            </div>
            <p className="text-sm text-gray-500">{profileData.experience}</p>
          </div>

          <div className="mt-4 border-t pt-4 border-gray-100">
            <p className="font-semibold text-gray-700">About:</p>
            <p className="text-gray-600 mt-1">{profileData.about}</p>
          </div>

          <p className="font-medium text-gray-700">
            Appointment fees:
            <span className="text-blue-600 font-bold">
              {isEdit ?
                <input
                  type="number"
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  value={profileData.fees}
                />
                : `₹${profileData.fees}`
              }
            </span>
          </p>

          <div className="border-t pt-4 border-gray-100">
            <p className="font-semibold text-gray-700">Address:</p>
            <p className="text-gray-600 mt-1">
              {isEdit ?
                <input
                  type="text"
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  value={profileData.address.line1}
                />
                : profileData.address.line1
              }
              <br />
              {isEdit ?
                <input
                  type="text"
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  value={profileData.address.line2}
                />
                : profileData.address.line2
              }
            </p>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={profileData.available}
              onClick={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="" className="ml-2 text-gray-700">Available</label>
          </div>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="mt-4 bg-[#0A48A8] hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow transition duration-150 ease-in-out"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-4 bg-[#0A48A8] hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow transition duration-150 ease-in-out"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
