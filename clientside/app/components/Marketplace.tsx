import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import MyLoader from "./Skeleton";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
interface SearchPageProps {
  setClothing: (clothing: File) => void;
  setOpen: (open: boolean) => void;
}

const Marketplace: React.FC<SearchPageProps> = ({ setClothing, setOpen }) => {
  const [marketplace, setMarketplace] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const kaspiRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/v1/kaspi", {
        url: query,
      });
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  const handleClick = async (url: string) => {
    try {
      const proxyUrl = `http://localhost:3001/fetch-image?url=${encodeURIComponent(
        url
      )}`;
      console.log(proxyUrl);

      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const file = new File([blob], uuidv4(), { type: blob.type });
      setClothing(file);
      setOpen(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  if (marketplace) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="w-full flex items-center justify-start px-4">
          <button
            onClick={() => setMarketplace(false)}
            className="text-lg font-semibold text-gray-700 hover:text-gray-900"
          >
            ← Назад
          </button>
        </div>
        <div>
          <h2 className="text-3xl mb-4 text-[#254D32] ml-4 font-bold mt-10">
            Поиск по ссылке
          </h2>
          <div className="w-[950px] flex justify-between items-center mx-4 mb-8">
            <div className="w-[450px] flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти одежду с ссылкой"
                className="w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-l shadow-sm focus:outline-none"
              />
              <button
                onClick={kaspiRequest}
                className="text-white px-4 bg-[#254D32] text-sm rounded-r hover:bg-[#254D32]"
              >
                Найти
              </button>
            </div>
            <div>
              <Button
                variant={"outline"}
                className="text-[#254D32] font-semibold border-2 border-[#254D32]"
              >
                Примеры
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-14 grid grid-cols-3 gap-6 overflow-auto max-h-[60vh]">
          <div className="col-span-3">
            <h2 className="text-3xl text-[#254D32] ml-2 font-bold">Картинки</h2>
          </div>

          {loading ? (
            <div className="col-span-3 grid grid-cols-3 gap-6">
              <MyLoader />
              <MyLoader />
              <MyLoader />
              <MyLoader />
              <MyLoader />
              <MyLoader />
            </div>
          ) : (
            images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleClick(image)}
                className="w-[320px] cursor-pointer my-8 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={image}
                  className="object-cover w-full h-48"
                  alt={`image-${index}`}
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="container mx-auto px-4 py-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Найти маркетплейс</h1>
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
          <div
            onClick={() => setMarketplace(true)}
            className="w-[320px] h-[160px] cursor-pointer mt-10"
          >
            <img
              src="/5f98f943e0742145161288.png"
              className="object-cover rounded w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
