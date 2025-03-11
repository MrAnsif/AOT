import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'


const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { backendurl } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }

  }, [dToken])


  return profileData && (
    <div>

      <div className="">
        <div className="">
          <img src={profileData.image} alt="" />
        </div>
        <div className="">
          <p>{profileData.name}</p>
          <div>
            <p>{profileData.degree} - {profileData.speciality}</p>
          </div>
          <p>{profileData.experience}</p>
        </div>

        <div className="">
          <p>About:</p>
          <p>{profileData.about}</p>
        </div>
        <p>Appointment fees: <span>₹{profileData.fees}</span></p>
      </div>

    </div>
  )
}

export default DoctorProfile