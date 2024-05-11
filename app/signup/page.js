'use client'
import { useRouter } from 'next/navigation';
import { useUserAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import Link from 'next/link';
export default function Register() {
  const {signup}=useUserAuth()
  const router = useRouter()
  const email = useRef()
  const password = useRef()
  const [error,setError] = useState()

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      await signup(email.current.value,password.current.value)
      router.push('/login')
    } catch (err) {
      setError(err.message)
    }

  }
    return (
      <main className="h-screen w-screen backgroundMain flex justify-betwwen items-center">
        <div className="bg-white flex flex-col m-auto w-[450px] px-8 py-6 rounded-md gap-4">
          <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
            <h1 className="text-4xl font-bold">Register</h1>
            {error && <p className='text-red-500'>{error.split('Firebase:')[1]}</p>}
            <input
              type="email"
              name="username"
              placeholder="Username"
              className="text-sm border-[2px] border-gray-300 p-3 rounded font-semibold outline-none focus:borderButtonColor"
              ref={email}
            />
            <input
            ref={password}
              type="password"
              name="password"
              placeholder="Password"
              className="text-sm border-[2px] border-gray-300 p-3 rounded font-semibold outline-none focus:borderButtonColor"
            />
            <button type='submit' className="w-full buttonColor text-white p-4 rounded text-[18px] active:scale-95">
              Sign up
            </button>
            <Link href='/login' className="text-gray-500 font-bold text-center cursor-pointer hover:text-red-500">Back</Link>
          </form>
        </div>
      </main>
    );
  }