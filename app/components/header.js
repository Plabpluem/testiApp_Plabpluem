"use client";
import Link from "next/link";
import UserHeaderBox from "./userHeaderBox";
import { useState } from "react";
import { useUserAuth } from "../context/AuthContext";

const HeaderMain = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const {user} = useUserAuth()
  return (
    <>
      <header className="sticky z-20 top-0 w-screen h-[50px] flex items-center justify-between bg-gray-600 px-10">
        <div className="w-[1200px] flex items-center justify-between m-auto relative">
          <ul className="flex h-[50px]">
            <Link href="/" className="hover:bg-black px-5 h-full flex items-center cursor-pointer">
              <svg
                className="w-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#ffffff"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
            </Link>
          </ul>
          <ul className="flex h-[50px]">
            {user && <li className="h-full flex items-center"><svg className="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></li>}
          <li
              className="hover:bg-black px-5 h-full flex items-center cursor-pointer"
              onClick={() => setShowNavbar((prev) => !prev)}
            >
              <svg
                className="w-[15px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#ffffff"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
            </li>
            <Link href="/cartshopping"
              className="hover:bg-black px-5 h-full flex items-center cursor-pointer"
            >
              <svg
                className="w-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#ffffff"
                  d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                />
              </svg>
            </Link>
          </ul>
          {showNavbar && (
            <UserHeaderBox showNavbar={(show) => setShowNavbar(show)} />
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderMain;
