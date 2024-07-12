"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

const Hero: React.FC = () => {
  useEffect(() => {
    const scroll = () => {
      const images = document.getElementById("scroll-images");
      if (images) {
        images.scrollBy(1, 0);
        if (images.scrollLeft >= images.scrollWidth / 2) {
          images.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#254D32] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-20 md:pt-32">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
          Виртуальная примерка в <br /> реальном времени
        </h1>
        <p className="text-xl md:text-[18px] text-white text-center mt-2">
          Индивидуальный подбор одежды из магазинов Казахстана
        </p>
        <Link href={'/prevton'}>
          <button className="mt-8 px-[50px] py-2 bg-white text-[14px] text-black font-semibold rounded">
            Примерить одежду
          </button>
        </Link>
      </div>
      <div
        id="scroll-images"
        className="absolute bottom-[30px] left-0 flex whitespace-nowrap overflow-x-hidden"
        style={{ willChange: "scroll-position" }}
      >
        {Array(10)
          .fill("/man.png")
          .map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Scrolling ${index}`}
              className="h-[312.5px] w-[250px] object-cover mx-[32px]"
            />
          ))}
      </div>
    </div>
  );
};

export default Hero;
