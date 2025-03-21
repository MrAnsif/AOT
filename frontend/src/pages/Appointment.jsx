import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MagicCard } from '@/components/ui/magic-card'
import { useTheme } from "next-themes";
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { toast } from 'react-toastify'
import axios from 'axios'
import styled from 'styled-components'
import { MdAddLocation } from "react-icons/md";
import { MdInfo } from "react-icons/md";




const Appointment = () => {

  const { theme } = useTheme();

  const { docId } = useParams()
  const { doctors, currencySymbol, backendurl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeak = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [homeConsultancy, setHomeConsultancy] = useState(false)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    // scrollTo(0, 0)
  }


  const getAvailableSlots = async () => {
    let today = new Date();
    let slotsForWeek = []; 

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);


      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      
      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      // Create slots from 10:00 AM to 9:00 PM (21:00)
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }


        // Increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add the day's slots to the week's slots array
      slotsForWeek.push(timeSlots);
    }

    // Update state after processing all days
    setDocSlots(slotsForWeek);
  };



  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointments')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendurl + '/api/user/book-appointment', { docId, slotDate, slotTime, homeConsultancy }, { headers: { token } })


      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }
      else {
        toast.error(data.message)
      }



    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }


  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

 
  return docInfo && (
    <div className=''>
      {/* =======doc details========== */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="">
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-5 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0  ">
          {/* ======doc info =========== */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-4 text-gray-600 text-sm mt-1 ml-2 '>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='cursor-default' >Experience - {docInfo.experience}</button>
          </div>
          {/* =======doc about======== */}
          <div>
            <p className='flex gap-1 items-center text-sm font-medium text-gray-900 mt-3 ' >About <MdInfo /></p>
            <p className='text-sm text-gray-700 max-w-[700px] mt-1 ml-2' >{docInfo.about}</p>
          </div>
          <div className=''>
            <p className='flex gap-1 items-center text-sm font-medium text-gray-900 mt-3 ' >Address<MdAddLocation /></p>
            <div className='text-sm text-gray-700 max-w-[700px] mt-1 ml-2'>
              <p>{docInfo.address.line1}</p>
              <p>{docInfo.address.line2}</p>
            </div>
          </div>
          <p className='text-gray-700  font-medium mt-4 '>Appointment fee:
            <span className='text-gray-800'> {currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/* ===booking slots====== */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((item, index) => (
              <MagicCard key={index}
                className="cursor-pointer flex-col items-center justify-center whitespace-nowrap shadow-2xl"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div key={index} onClick={() => setSlotIndex(index)} className={`text-center py-6 lg:min-w-12 sm:min-w-4 rounded cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : ''}`}>
                  <p>{item[0] && daysOfWeak[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              </MagicCard>
            ))
          }
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-300'}`} >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <StyledWrapper>
          <label className="cyberpunk-checkbox-label px-4 pt-6">
            <input type="checkbox"
              className="cyberpunk-checkbox"
              checked={homeConsultancy}
              onChange={(e) => setHomeConsultancy(e.target.checked)} />
            Home Consultancy</label>
        </StyledWrapper>

        <InteractiveHoverButton onClick={bookAppointment} className='px-6 py-2 my-6'>Book Appointment</InteractiveHoverButton>
      </div>
    </div>
  )
}


const StyledWrapper = styled.div`
  .cyberpunk-checkbox {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #163d77;
    border-radius: 5px;
    background-color: transparent;
    display: inline-block;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
  }

  .cyberpunk-checkbox:before {
    content: "";
    background-color: #163d77;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 10px;
    height: 10px;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  .cyberpunk-checkbox:checked:before {
    transform: translate(-50%, -50%) scale(1);
  }

  .cyberpunk-checkbox-label {
    font-size: 15px;
    color: #21242c;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }`;


export default Appointment