import React, { use, useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/ADminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendurl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error('Please upload image')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(backendurl + '/api/admin/add-doctor', formData, { headers: { aToken } })


      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setAddress1('')
        setAddress2('')
        setFees('')
        setAbout('')
        setSpeciality('General Physician')
        setDegree('')
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} action="" className="max-w-3xl  mx-auto bg-white p-6 shadow-md rounded-lg space-y-6">
      <p className="text-2xl font-semibold text-gray-700">Add Doctor</p>

      <div className="space-y-6 overflow-y-scroll max-h-[80vh]" >
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className="w-24 h-24 object-cover rounded-full border border-gray-300" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-gray-600 text-sm">Upload doctor <br /> picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-gray-700">Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="input-field" />
            </div>
            <div>
              <p className="text-gray-700">Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="input-field" />
            </div>
            <div>
              <p className="text-gray-700">Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="input-field" />
            </div>
            <div>
              <p className="text-gray-700">Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} required className="input-field">
                <option value="">Select Experience</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-gray-700">Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} type="text" placeholder="Fees" required className="input-field" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-700">Specialization</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} required className="input-field">
                <option value="General physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p className="text-gray-700">Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="input-field" />
            </div>
            <div>
              <p className="text-gray-700">Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="input-field" />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="input-field mt-2" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-700">About Doctor</p>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about} type="text" placeholder="Write about doctor" rows={5} required className="input-field resize-none w-full"></textarea>
          </div>
          <button type='submit' className="w-full bg-[#0a48a8] text-white py-2 rounded-md hover:bg-blue-600 transition">Add Doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
