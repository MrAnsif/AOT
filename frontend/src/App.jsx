import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className='bg-[#EFF5EE]' >
      <div className='mx-4 sm:mx-[10%] '>
        <ToastContainer />
        <Navbar />
        <div className=''>
          <Chatbot />
        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App