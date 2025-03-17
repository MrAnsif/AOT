import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const { backendurl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendurl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        const { data } = await axios.post(backendurl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)

    }

  }

  useEffect(() => {
   
    if (token){
      navigate('/')
    }

  }, [token])
  

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className="flex bg-zinc-100 flex-col gap-3 m-auto items-start p-8 min-w-[340px]  sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className='text-2xl font-semibold '>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Pleace {state === 'Sign Up' ? "Create Account" : "Login"} to book an appointment.</p>
        {
          state === 'Sign Up' &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }
        <div className='w-full'>
          <p>Full Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Full Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 `' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        
        <button type='submit' className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight bg-[#0a48a8] px-3 py-1 rounded-full text-white  dark:from-white dark:to-slate-900/10 lg:text-base">{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up' ?
            <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create an account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer '>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login