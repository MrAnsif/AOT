import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllApointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#eff5ee]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <span className='ml-14 md:ml-54 mt-16 px-3 py-8 h-screen w-full overflow-y-auto '>
          <Routes >
            {/* admin route */}
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorList />} />

            {/* doctor route */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />
          </Routes>
        </span>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App