/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductBox from "./UI/productBox";
import { useUserAuth } from "./context/AuthContext";
import NotiAddCart from "./UI/notiAddCart";
import Loading from "./UI/loading";

export default function HomePage() {
  const [products, setProducts] = useState(null);
  const [showNotify, setShowNotify] = useState(false);
  const apiProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const productsapi = await response.json();
      setProducts(productsapi);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiProducts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotify(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showNotify]);
  return (
    <main className="min-h-screen w-screen backgroundHome">
      {products ? (
        <section>
          <section className="max-w-[1500px] mx-auto  grid grid-cols-1 sm:grid-cols-2 gap-8 xl:grid-cols-4 md:grid-cols-3 py-10">
            {products.map((item, index) => (
              <ProductBox
                item={item}
                key={index}
                showNoti={(show) => setShowNotify(show)}
              />
            ))}
          </section>
        </section>
      ) : (
        <Loading />
      )}

      {showNotify && <NotiAddCart />}
    </main>
  );
}
