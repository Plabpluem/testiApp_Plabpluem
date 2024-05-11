'use client'
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const {login,user}=useUserAuth()
  const email = useRef()
  const password = useRef()
  const [error,setError] = useState(null)
  const router = useRouter()
  
  const onLoginHandler = async(e) => {
    e.preventDefault()
    try {
      await login(email.current.value,password.current.value)
      localStorage.setItem('user',email.current.value)
      router.push('/')
    } catch (err) {
      setError("Incorrect email or password")
    }
  }
  return (
    <main className="h-screen w-screen flex justify-betwwen items-center backgroundMain">
      <div className="bg-white flex flex-col m-auto w-[450px] px-8 py-6 rounded-md gap-4">
        <form className="flex flex-col gap-4" onSubmit={onLoginHandler}>
          <h1 className="text-4xl font-bold">Log in</h1>
          {error && <p className="text-red-500 font-medium text-[14px]">{error}</p>}
          <input
            type="email"
            ref={email}
            name="username"
            placeholder="Username"
            className="text-sm border-[2px] border-gray-300 p-3 rounded font-semibold outline-none focus:borderButtonColor"
          />
          <input
            type="password"
            ref={password}
            name="password"
            placeholder="Password"
            className="text-sm border-[2px] border-gray-300 p-3 rounded font-semibold outline-none focus:borderButtonColor"
          />
          <button
            type="submit"
            className="w-full buttonColor text-white p-4 rounded text-[18px] active:scale-95"
          >
            Log in
          </button>
          <Link
            href="/signup"
            className="text-gray-500 font-bold text-center cursor-pointer hover:text-red-500"
          >
            or,sign up
          </Link>
        </form>
      </div>
    </main>
  );
}
