'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from '../firebase'

const userContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    const hr = 60*60*1000
    const expire = new Date().getTime() + hr
    localStorage.setItem('exp',expire)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem('exp')
    return signOut(auth);
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(current)=>{
        setUser(current)
    })
    return ()=>{
        unsubscribe()
    }
  },[])

  useEffect(()=>{
    const expire = localStorage.getItem('exp')
    const nowTime = new Date().getTime()
    const duration = expire - nowTime

    if(duration < 0){
      signOut(auth)
    }
  },[])
  return (
    <userContext.Provider value={{signup,login,logOut,user}}>
        {children}
    </userContext.Provider>
  ) 
};

export default AuthContextProvider;

export function useUserAuth(){
    return useContext(userContext)
}
