
import { ShimmerButton } from '@/components/ui/shimmer-button'
import React, { useState } from 'react'



const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form className='min-h-[80vh] flex items-center'>
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
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </span>
        </ShimmerButton>
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