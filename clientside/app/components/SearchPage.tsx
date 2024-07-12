"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface Item {
  image: string;
  name: string;
  price: string;
  label: string;
}

interface Category {
  headwear?: Item[];
  bottom?: Item[];
  shirt?: Item[];
  [key: string]: Item[] | undefined;
}

interface SearchPageProps {
  setClothing: (clothing: File) => void;
  setOpen: (open: boolean) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ setClothing, setOpen }) => {
  const [qrep, setQrep] = useState(false);
  const [zara, setZara] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [zaraItems, setZaraItems] = useState<Item[]>([]);
  const getMagaz = async (magaz: string) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/magaz", {
        magaz: magaz,
      });

      const data: Category[] = response.data;
      if (magaz === "qrep") {
        const extractedItems = extractItems(data);
        setItems(extractedItems);
      } else if (magaz === "zara") {
        setZaraItems(response.data.zara_dresses);
      }
    } catch (error) {
      console.error("Error fetching magaz data:", error);
    }
  };

  const extractItems = (data: Category[]): Item[] => {
    const result: Item[] = [];
    data.forEach((category) => {
      (Object.keys(category) as (keyof Category)[]).forEach((key) => {
        if (
          key === "headwear" ||
          key === "bottom" ||
          key === "shirt" ||
          key === "tshirts" ||
          key === "shirt" ||
          key === "sweatshirts"
        ) {
          if (category[key]) {
            result.push(...(category[key] as Item[]));
          }
        }
      });
    });
    return result;
  };

  useEffect(() => {
    getMagaz("qrep");
    getMagaz("zara");
  }, []);

  const handleClickRep = async (item: Item) => {
    try {
      console.log("Fetching image:", item.image);
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(proxyUrl + item.image);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const file = new File([blob], item.name, { type: blob.type });
      setClothing(file);
      setOpen(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleClick = async (item: Item) => {
    try {
      console.log("Fetching image:", item.image);
      const response = await fetch(item.image);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const file = new File([blob], item.name, { type: blob.type });
      setClothing(file);
      setOpen(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  const filtered = query === "" ? items : filteredItems;

  if (qrep) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="w-full flex items-center justify-start px-4">
          <button
            onClick={() => setQrep(false)}
            className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          >
            ← Назад
          </button>
        </div>
        <div className="w-[950px] flex justify-between items-center mx-4 mt-10 mb-12">
          <div className="text-2xl font-semibold">Магазины</div>
          <div className="w-[300px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти свой магазин"
              className="w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="text-sm opacity-[70%]">
            Сортировать по средней цене
          </div>
        </div>
        <hr />
        <div className="px-14 grid grid-cols-3 gap-6 overflow-auto max-h-[60vh]">
          {filtered.map((item, index) => (
            <div
              onClick={() => handleClickRep(item)}
              key={index}
              className="w-[320px] cursor-pointer my-8 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">{item.price.split("₸")[0]}₸</p>
                {item.label && (
                  <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-white bg-green-500 rounded-full">
                    {item.label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (zara) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="w-full flex items-center justify-start px-4">
          <button
            onClick={() => setZara(false)}
            className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          >
            ← Назад
          </button>
        </div>
        <div className="w-[950px] flex justify-between items-center mx-4 mt-10 mb-12">
          <div className="text-2xl font-semibold">Магазины</div>
          <div className="w-[300px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти свой магазин"
              className="w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="text-sm opacity-[70%]">
            Сортировать по средней цене
          </div>
        </div>
        <hr />
        <div className="px-14 grid grid-cols-3 gap-6 overflow-auto max-h-[60vh]">
          {zaraItems.map((item, index) => (
            <div
              onClick={() => handleClick(item)}
              key={index}
              className="w-[320px] cursor-pointer my-8 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">{+item.price.split('₸')[0]/100}</p>
                {item.label && (
                  <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-white bg-green-500 rounded-full">
                    {item.label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="container mx-auto px-4 py-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Найти одежду</h1>
          <h1
            className="cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          >
            x
          </h1>
        </div>
        <hr />
        <div className="px-14 grid grid-cols-3 gap-6">
          <div className="w-[320px] h-[160px] cursor-pointer mt-10">
            <img
              onClick={() => {
                setQrep(true);
              }}
              src="/XXL_height.webp"
              className="object-cover rounded w-full h-full"
            />
          </div>
          <div className="w-[320px] h-[160px] cursor-pointer mt-10">
            <img
              onClick={() => {
                setZara(true);
              }}
              src="/zara.jpeg"
              className="object-cover rounded w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
