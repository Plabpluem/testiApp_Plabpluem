/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import ProductBox from "./UI/productBox";
import NotiAddCart from "./UI/notiAddCart";
import Loading from "./UI/loading";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  const [showNotify, setShowNotify] = useState(false);
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProduct();
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
