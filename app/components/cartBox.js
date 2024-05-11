"use client";
import { useSelector } from "react-redux";
import ProductListCart from "../UI/productListCart";
import { useUserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import ConfirmModal from "../UI/confirmModal";
import { useState } from "react";
import Link from "next/link";

const CartBox = (props) => {
  const cart = useSelector((state) => state.cart);
  const { user } = useUserAuth();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [getIdDelete, setIdDelete] = useState(null);

  const onCloseCartHandler = () => {
    router.push("/");
  };

  const onReceiveCloseId = (show, id) => {
    setShowConfirm(show);
    setIdDelete(id);
  };

  const onCheckOutHandler = () => {
    if (!user) {
      window.alert("Please Login before Checkout");
      router.push("/login");
    } else {
      router.push("/address");
    }
  };
  return (
    <main className="backgroundMain relative w-screen h-screen flex justify-center items-center">
      <section className="z-9 m-auto bg-white flex flex-col m-auto lg:w-[800px] md:w-[600px] min-h-[150px] max-h-[500px]  rounded-md gap-4">
        <span className="flex gap-3 border-b border-gray-400 px-4 py-4 ">
          <svg
            className="w-[25px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="#000000"
              d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
            />
          </svg>
          <h1 className="text-[22px] font-medium">My Cart</h1>
        </span>
        {cart.items.length === 0 && (
          <section className="flex flex-col items-center gap-4">
            <h1 className="text-center font-semibold text-lg px-4">
              No Product
            </h1>
            <Link
              href="/"
              className="text-center textBlue border-2 borderButtonColor hover:buttonColor hover:text-white active:scale-95 rounded-md px-3 py-2"
            >
              Let go to shopping
            </Link>
          </section>
        )}
        {cart.items.length >= 1 && (
          <section className="px-4 overflow-y-auto ">
            {cart.items.map((item, index) => {
              return (
                <ProductListCart
                  detail={item}
                  key={index}
                  index={index}
                  showConfirm={(show, id) => onReceiveCloseId(show, id)}
                />
              );
            })}
            <div className="w-full flex text-sm gap-2 px-2 py-2 items-center  border-gray-400 border border-t-0">
              <span className="w-8"></span>
              <p className="lg:w-[500px] md:w-[300px] w-[200px]">Total</p>
              <span className="w-[50px]"></span>
              <span className="w-[50px]"></span>
              <p className="w-[50px]">${cart.totalAmount.toFixed(2)}</p>
              <span className="w-4"></span>
            </div>
            <div className="w-full flex text-sm gap-2 px-2 py-2 items-center  border-gray-400 border border-t-0">
              <span className="w-8"></span>
              <p className="lg:w-[500px] md:w-[300px] w-[200px] text-red-500">Total(including discount)</p>
              <span className="w-[50px]"></span>
              <span className="w-[50px]"></span>
              <p className="w-[50px]">${cart.totalAmount.toFixed(2) - cart.totalDiscount}</p>
              <span className="w-4"></span>
            </div>
          </section>
        )}
        <div className="flex justify-end gap-2 mx-2 my-2">
          <button
            type="button"
            className="border rounded-md text gray-400 border border-gray-400 px-3 py-2 active:scale-95"
            onClick={onCloseCartHandler}
          >
            Close
          </button>
          {cart.items.length !== 0 && (
            <button
              className="border rounded-md buttonColor text-white px-3 py-2 active:scale-95"
              onClick={onCheckOutHandler}
            >
              Checkout
            </button>
          )}
        </div>
      </section>
      {showConfirm && (
        <ConfirmModal id={getIdDelete} show={(show) => setShowConfirm(show)} />
      )}
    </main>
  );
};

export default CartBox;
