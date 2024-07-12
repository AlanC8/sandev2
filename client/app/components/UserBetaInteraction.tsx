"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { AlertDemo } from "./Alert";

const UserBetaInteraction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [value, setValue] = useState("");

  const clickedToCreateOutfit = () => {
    if (value === "") {
      setAlertVisible(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div className="relative flex flex-col justify-center">
      {loading && (
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      )}
      {alertVisible && (
        <AlertDemo
          title="Пустое значение"
          description="Пожалуйста, введите ваш запрос."
          onClose={closeAlert}
        />
      )}
      <div className="text-center font-bold text-white text-[24px] mb-[30px] mt-[60px] md:text-[42px] lg:text-[54px]">
        Подбор одежды по <br /> предпочтениям.
      </div>
      <div className="flex flex-col justify-center mb-10 md:mb-14">
        <div className="mx-auto md:w-[450px]">
          <input
            className="px-4 mb-4 py-2 rounded w-[100%] md:w-[100%] md:mt-10"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Подбери мне удобную одежду..."
          />
        </div>
        <div className="mx-auto md:w-[450px]">
          <button
            onClick={clickedToCreateOutfit}
            className="px-4 py-2 bg-[#254D32] text-white font-semibold rounded shadow-md  md:w-[100%]"
          >
            Создать идеальный образ
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default UserBetaInteraction;
