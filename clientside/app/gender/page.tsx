"use client";
import React, { useState } from "react";
import Header from "../components/Header";

const Gender = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    style: "",
  });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h1>Укажите ваш пол</h1>
            <div className="flex">
                <img src="./woman.png" alt="" />
                <img src="./man.png" alt="" />
            </div>
            <button onClick={handleNextStep}>Далее</button>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Выберите стиль</h2>
            <label>
              <input
                type="radio"
                name="style"
                value="casual"
                checked={formData.style === "casual"}
                onChange={handleInputChange}
              />
              Повседневный
            </label>
            <label>
              <input
                type="radio"
                name="style"
                value="formal"
                checked={formData.style === "formal"}
                onChange={handleInputChange}
              />
              Формальный
            </label>
            <button onClick={handlePrevStep}>Назад</button>
            <button onClick={handleNextStep}>Далее</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Обзор</h2>
            <p>Пол: {formData.gender}</p>
            <p>Стиль: {formData.style}</p>
            <button onClick={handlePrevStep}>Назад</button>
            <button onClick={() => alert("Опрос завершен")}>Завершить</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="w-[80%] mx-auto">{renderStep()}</div>
    </div>
  );
};

export default Gender;
