import Link from "next/link";
import { useUserAuth } from "../context/AuthContext";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const UserHeaderBox = (props) => {
  const { user, logOut } = useUserAuth();
  const router = useRouter()
  const userContainer = useRef()

  const onLogoutHandler = async () => {
    await logOut();
    localStorage.removeItem('user')
    props.showNavbar(false)
    router.push('/')
  };

  const onGotoLoginPage = () => {
    props.showNavbar(false)
  }

  const onClickOutUsercontainer =useCallback((e) => {
    if(userContainer.current && !userContainer.current.contains(e.target)){
      props.showNavbar(false)
    }
  },[props])

  useEffect(()=>{
    document.addEventListener("click", onClickOutUsercontainer);
  },[onClickOutUsercontainer])
  return (
    <section className="flex flex-col min-w-[200px] bg-white absolute top-[120%] right-16 rounded-md overflow-hidden drop-shadow-md" ref={userContainer}>
      {!user && <Link href='/login' onClick={onGotoLoginPage} className="w-full px-4 py-3 font-sm cursor-pointer hover:bg-gray-300">Login / Sign up</Link>}
      {user && (
        <>
          <p className="border-b-[2px] px-4 py-3 font-semibold text-gray-500">
            Logged in as {user.email.split("@")[0]}
          </p>
          <span
            className="w-full px-4 py-3 font-medium cursor-pointer hover:bg-gray-300"
            onClick={onLogoutHandler}
          >
            Logout
          </span>
        </>
      )}
    </section>
  );
};

export default UserHeaderBox;
