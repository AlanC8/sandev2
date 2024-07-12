"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { ContextService } from "../services/ContextService";

const Shops: React.FC = () => {
  const [sortValue, setSortValue] = useState("Сортировать по");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(event.target.value);
  };

  return (
    <div className="w-[80%] mx-auto mb-10">
      <Header />
      <div className="flex items-center justify-between mt-20 mb-10">
        <div className="shops-title">
          <h1 className="text-4xl font-bold mb-4">Магазины</h1>
        </div>
        <div className="shops-input">
          <input
            type="text"
            placeholder="Найти свой магазин"
            className="w-full w-[350px] p-2 border text-[16px] font-regular border-gray-300 rounded-md"
          />
        </div>
        <div className="">
          <select
            value={sortValue}
            onChange={handleSortChange}
            name="sort"
            id="sort"
            className="ml-4 p-2 border border-gray-300 rounded-md"
          >
            <option value="Сортировать по" disabled>
              Сортировать по
            </option>
            <option value="1">по популярности</option>
            <option value="2">по новизне</option>
            <option value="3">по рейтингу</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="max-w-xl w-[320px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src="/qazaqrep.jpeg" alt="" />
          </a>
          <div className="p-5">
            <a
              onClick={() => {
                const contextService = new ContextService();
                contextService.setData("qrep");
              }}
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Qazaq Republic
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Qazaq Republic — это ваш универсальный магазин стильной и
              современной одежды, созданной с учетом традиций и культуры
              Казахстана
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
