import React from "react";
import UserBetaInteraction from "./UserBetaInteraction";
import { CarouselDemo } from "./HeaderImage";
import '../styles/globals.css'
const BetaHero = () => {

  return (
    <div className="m-5">
      <div className="flex flex-col">
        <div className="flex justify-between md:mx-auto md:w-[80%]">
          <div className="">
            <div className="mt-[90px] text-white text-7xl font-black md:text-9xl md:mt-[150px]">
              Sände
            </div>
            <div
              className="text-white leading-6 comfort text-[16px] font-semibold mb-[60px] md:text-[18px] md:max-w-[400px] 
          md:mb-[120px]"
            >
              Прорыв в мире моды - примерка одежды с помощью передового
              искусственного интеллекта нового поколения
            </div>
          </div>
          <div className="hidden lg:flex lg:w-[400px] lg:ml-4 lg:items-center">
            <CarouselDemo />
          </div>
        </div>
        <div className="border-[#B5A989] border-2 rounded text-[#000]"></div>
        <UserBetaInteraction />
      </div>
    </div>
  );
};
export default BetaHero;
