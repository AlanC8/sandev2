"use client";
import React, { useEffect, useState } from "react";
import MyModal from "../components/UI/modal/MyModal";
import SearchPage from "../components/SearchPage";
import axios from "axios";
import { saveAs } from "file-saver";
import "./vtonstyle.css";
import Marketplace from "../components/Marketplace";

const TryOnInterface: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [clothing, setClothing] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [active, setActive] = useState<"stores" | "link">("stores");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("upper_body");
  const [marketplace, setMarketPlace] = useState(false);
  const [visibleZara, setVisibleZara] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  useEffect(() => {
    fetch("/KakaoTalk_Photo_2024-04-04-21-44-45.png")
      .then((res) => res.blob())
      .then((blob) => {
        setAvatar(new File([blob], "avatar.jpg", { type: blob.type }));
      });

    fetch("/sweater.webp")
      .then((res) => res.blob())
      .then((blob) => {
        setClothing(new File([blob], "clothing.jpg", { type: blob.type }));
      });

    setResult("/output.jpg");
  }, []);
  console.log(avatar, clothing, result);

  const handleClothingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setClothing(file);
    }
  };

  const applyClothing = () => {
    if (avatar && clothing) {
      setLoading(true);
      const formData = new FormData();
      formData.append("human_img", avatar);
      formData.append("garm_img", clothing);
      formData.append("category", category);

      axios
        .post("http://localhost:3001/api/v1/vton", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setResult(response.data.output); // Assuming 'output' contains the URL to the result image
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const downloadImage = () => {
    if (result) {
      saveAs(result, "result.jpg");
    }
  };

  const exampleImages = [
    {
      human: "/KakaoTalk_Photo_2024-04-04-21-44-45.png",
      garm: "/sweater.webp",
      result: "/output.jpg",
    },
    {
      human: "/KakaoTalk_Photo_2024-04-04-21-20-19.png",
      garm: "/1651226390029b54a1a3916944b9691fc3e9122d4e_wk_shein_thumbnail_900x.webp",
      result: "/output (1).jpg",
    },
  ];

  const handleExampleClick = (example: {
    human: string;
    garm: string;
    result: string;
  }) => {
    fetch(example.human)
      .then((res) => res.blob())
      .then((blob) => {
        setAvatar(new File([blob], "avatar.jpg", { type: blob.type }));
      });

    fetch(example.garm)
      .then((res) => res.blob())
      .then((blob) => {
        setClothing(new File([blob], "clothing.jpg", { type: blob.type }));
      });

    setResult(example.result);
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="pb-4 pt-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Примерить одежду в сайте</h1>
        <div className="flex">
          <button
            className={`py-2 px-4 rounded-l ${
              active === "stores"
                ? "bg-[#254D32] text-white"
                : "bg-white text-[#254D32]"
            }`}
            onClick={() => {
              setActive("stores");
              setVisible(true);
            }}
          >
            Магазины
          </button>
          <button
            className={`py-2 px-4 rounded-r-lg ${
              active === "link"
                ? "bg-[#254D32] text-white"
                : "bg-white text-[#254D32]"
            }`}
            onClick={() => {
              setActive("link");
              setVisibleZara(true);
            }}
          >
            Ссылкой
          </button>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-12 gap-4 p-8 text-[#254D32]">
        <div className="col-span-6">
          <div className="flex flex-col space-y-10">
            {/* First Cell: My Picture */}
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl mb-4 font-bold">Ваша фотка</h2>
                <div className="mb-2">
                  <label htmlFor="category" className="mr-2">
                    Категории:
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="upper_body">Upper Body</option>
                    <option value="lower_body">Lower Body</option>
                    <option value="dresses">Dresses</option>
                  </select>
                </div>
              </div>
              <div
                className={`border-dashed min-h-[200px] rounded border-2 p-4 text-center ${
                  avatar ? "" : "flex justify-center items-center"
                }`}
              >
                <input
                  type="file"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatarUpload"
                />
                <label
                  htmlFor="avatarUpload"
                  className={`cursor-pointer ${avatar ? "hidden" : "block"}`}
                >
                  Перетащите фотографию сюда
                </label>
                {avatar && (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar"
                    className="rounded mx-auto max-h-full max-w-full"
                  />
                )}
              </div>
              <div className="flex justify-end">
                <button className="mt-4 px-4 py-2 bg-[#254D32] text-white rounded">
                  Использовать аватарку
                </button>
              </div>
            </div>

            {/* Second Cell: Clothing */}
            <div className="p-4">
              <h2 className="text-3xl mb-4 font-bold">Изображение одежды</h2>
              <div
                className={`border-dashed rounded border-2 min-h-[200px] h-auto border-gray-300 p-4 text-center relative ${
                  clothing ? "" : "flex justify-center items-center"
                }`}
              >
                <input
                  type="file"
                  onChange={handleClothingUpload}
                  className="hidden"
                  id="clothingUpload"
                />
                <label
                  htmlFor="clothingUpload"
                  className={`cursor-pointer ${clothing ? "hidden" : "block"}`}
                >
                  Перетащите фотографию сюда
                </label>
                {clothing && (
                  <img
                    src={URL.createObjectURL(clothing)}
                    alt="Clothing"
                    className="rounded absolute inset-0 h-full w-full object-contain"
                  />
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => {
                    setClothing(null);
                    setAvatar(null);
                    setResult(null);
                  }}
                >
                  Стереть
                </button>
                <button
                  className="px-4 py-2 bg-[#254D32] text-white rounded"
                  onClick={applyClothing}
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="col-span-1 flex justify-center">
          <div className="h-full border-l-2 border-gray-300 mx-2"></div>
        </div>

        {/* Third Cell: Result */}
        <div className="col-span-5 p-4">
          <h2 className="text-3xl mb-4 font-bold">Результат</h2>
          <div className="border-dashed border-2 rounded min-h-[200px] border-gray-300 p-4 text-center">
            {loading ? (
              <div className="flex justify-center items-center min-h-[450px]">
                <div className="loader">Загрузка...</div>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center">
                <img
                  src={result}
                  alt="Result"
                  className="mx-auto rounded max-h-full max-w-full"
                />
                <button
                  onClick={downloadImage}
                  className="mt-4 px-4 py-2 bg-[#254D32] text-white rounded"
                >
                  Скачать
                </button>
              </div>
            ) : (
              <p>Результат</p>
            )}
          </div>
        </div>
        {/* Examples Section */}
        <div className="col-span-12 mt-8">
          <hr />
          <h2 className="text-3xl mt-10 mb-6 font-bold">Примеры</h2>
          <div className="grid grid-cols-4 gap-6">
            {exampleImages.map((example, index) => (
              <div
                key={index}
                className="h-64 w-64 border border-gray-300 rounded cursor-pointer"
                onClick={() => handleExampleClick(example)}
              >
                <img
                  src={example.result}
                  alt={`Example ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {visible && (
        <MyModal visible={visible} setVisible={setVisible}>
          <SearchPage setClothing={setClothing} setOpen={setVisible} />
        </MyModal>
      )}
      {visibleZara && (
        <MyModal visible={visibleZara} setVisible={setVisibleZara}>
          <Marketplace setClothing={setClothing} setOpen={setVisibleZara}/>
        </MyModal>
      )}
    </div>
  );
};

export default TryOnInterface;
