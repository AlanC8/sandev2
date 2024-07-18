import React, { useState, useEffect } from "react";
import MyModals from "./UI/modals/MyModal";
import { useRouter } from "next/navigation";
import { UserService } from "../services/UserServices";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const motivationalQuotes = [
  "Одежда — это способ выразить себя без слов.",
  "Каждый день — это модный показ, и мир — твой подиум.",
  "Стиль — это способ показать, кто ты есть, не говоря ни слова.",
  "Мода проходит, стиль остается.",
  "Хорошая одежда открывает все двери.",
  "Ты никогда не будешь слишком одет или недостаточно одет в маленьком черном платье.",
  "Наряди себя, и ты завоюешь мир.",
  "Мода — это мгновенная речь.",
  "Стиль — это знание, кто ты есть, чего ты хочешь сказать, и не обращение на мнение других.",
];

const loadingMessages = ["Загрузка...", "Подготовка...", "Ищем ваш размер..."];

interface ClothingItem {
  image: string;
  name: string;
  price: string;
}

interface Outfit {
  headwear: ClothingItem;
  topwear: ClothingItem[];
  bottom: ClothingItem;
}

interface Weather {
  temperature: number;
  description: string;
  city: string;
}

const WeatherOutfit: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<{
    lat: number | null;
    lon: number | null;
  }>({ lat: null, lon: null });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [tryOn, setTryOn] = useState<boolean>(false);
  const [tryOnLink, setTryOnLink] = useState<string>("");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Ошибка при получении геолокации:", error);
        }
      );
    } else {
      console.error("Геолокация не поддерживается этим браузером.");
    }
  }, []);

  useEffect(() => {
    const fetchWeatherAndOutfit = async () => {
      if (location.lat && location.lon) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3001/api/v1/weather-outfit?lat=${location.lat}&lon=${location.lon}`
          );
          setWeather(response.data.weather);
          setOutfit(response.data.outfit);
        } catch (error) {
          console.error(
            "Ошибка при получении данных о погоде или наряде:",
            error
          );
        }
        setLoading(false);
      }
    };
    fetchWeatherAndOutfit();
  }, [location]);

  const handleGenerateOutfit = async (category: string, imageLink: string) => {
    setModalVisible(true);
    setTryOn(true);

    const interval = setInterval(() => {
      setLoadingMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length
      );
    }, 1000);

    try {
      const response = await UserService.vtonLogo(imageLink, category);
      clearInterval(interval);
      if (response && response.status === 200) {
        setTryOn(false);
        setTryOnLink(response.data.output);
      } else if (response && response.status === 401) {
        router.push("/login");
      }
    } catch (error) {
      clearInterval(interval);
      console.error("Ошибка при генерации нового наряда:", error);
    }
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  async function imageUrlToFile(imageUrl: string, fileName: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  const downloadImage = async () => {
    if (tryOnLink) {
      const file = await imageUrlToFile(tryOnLink, uuidv4() + ".jpg");
      saveAs(file, "result.jpg");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {loadingMessages[loadingMessageIndex]}
      </div>
    );
  }

  if (!weather || !outfit) {
    return (
      <div className="flex justify-center items-center h-screen">
        Ошибка при получении данных.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2">
            <div className="relative p-4 rounded-lg group">
              <img
                src={outfit.headwear.image}
                alt={outfit.headwear.name}
                className="rounded-md mb-4 w-full h-56 object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() =>
                  handleGenerateOutfit("upper_body", outfit.headwear.image)
                }
              >
                Примерить наряд
              </button>
              <h2 className="text-xl font-bold">{outfit.headwear.name}</h2>
              <p className="text-gray-700">{outfit.headwear.price}</p>
            </div>
            {outfit.topwear.map((item, index) => (
              <div key={index} className="relative p-4 rounded-lg group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-md mb-4 w-full h-56 object-cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleGenerateOutfit("upper_body", item.image)}
                >
                  Примерить наряд
                </button>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-700">{item.price}</p>
              </div>
            ))}
            <div className="relative p-4 rounded-lg group">
              <img
                src={outfit.bottom.image}
                alt={outfit.bottom.name}
                className="rounded-md mb-4 w-full h-56 object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() =>
                  handleGenerateOutfit("lower_body", outfit.bottom.image)
                }
              >
                Примерить наряд
              </button>
              <h2 className="text-xl font-bold">{outfit.bottom.name}</h2>
              <p className="text-gray-700">{outfit.bottom.price}</p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:ml-10 lg:w-1/2">
            <h1 className="text-5xl font-bold mt-4 mb-6">Сегодняшний образ</h1>
            <div className="flex items-end">
              <h2 className="text-2xl font-semibold">Город: </h2>
              <span className="text-2xl ml-2">{weather.city}</span>
            </div>
            <div className="flex items-end">
              <h2 className="text-2xl font-semibold">Погода: </h2>
              <p className="text-2xl ml-2">
                {weather.temperature}°C, {weather.description}
              </p>
            </div>
            <p className="text-gray-700 text-lg mt-4">
              Каждый житель сталкивается с проблемой: что надеть сегодня? Наша
              функция подбирает одежду специально для вас, учитывая погодные
              условия в вашем городе. <br />
              Мы анализируем текущую температуру и прогноз погоды, чтобы
              предложить максимально комфортный и стильный образ на каждый день.
              Рекомендации по одежде обновляются ежедневно каждые 24 часа, чтобы
              вы всегда выглядели наилучшим образом. <br />
              Неважно, где вы находитесь – будь то Алматы или Амстердам – мы
              подскажем, что надеть, чтобы чувствовать себя комфортно и уверенно
              в любой ситуации.
            </p>
          </div>
        </div>
      </main>
      <MyModals visible={modalVisible} setVisible={setModalVisible}>
        {tryOn ? (
          <div className="flex justify-center items-center h-full">
            {loadingMessages[loadingMessageIndex]}
          </div>
        ) : (
          <div className="mt-4 px-4 sm:px-10">
            <h2 className="text-3xl font-semibold text-center">Ваша одежда</h2>
            <div className="flex flex-col items-center lg:flex-row lg:w-[850px]">
              <div className="w-full lg:w-[250px] h-[450px] flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <img
                    src={tryOnLink}
                    alt="try-on"
                    className="rounded-md max-w-full max-h-full"
                  />
                  <div className="w-full">
                    <Button
                      onClick={downloadImage}
                      className="bg-[#254D32] w-full rounded mt-2"
                    >
                      Скачать
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-grow w-full lg:w-2/3 p-4">
                <p className="text-left text-2xl font-medium mb-4 mt-2">
                  {getRandomQuote()}
                </p>
                <div className="mt-6">
                  <h1 className="text-xl font-semibold mb-4">
                    Также примерить:
                  </h1>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => router.push("/vton")}
                      className="p-2 border rounded-md cursor-pointer"
                    >
                      <img
                        src="https://qazaqrepublic.com/uploads/thumbs/short-shirt-white-2-3bf7bae364-e538d4e23cee8b9c121939403e9b163d.jpeg"
                        alt="Other Item 1"
                        className="rounded-md"
                      />
                    </div>
                    <div
                      onClick={() => router.push("/vton")}
                      className="p-2 border rounded-md cursor-pointer"
                    >
                      <img
                        src="https://qazaqrepublic.com/uploads/thumbs/fw23-web-makets-hoodie-zipper-ye-f0e19471a6-c2a353b8a3b7f7f1fd446138b37ae185.jpeg"
                        alt="Other Item 2"
                        className="rounded-md"
                      />
                    </div>
                    <div
                      onClick={() => router.push("/vton")}
                      className="p-2 border rounded-md cursor-pointer"
                    >
                      <img
                        src="https://qazaqrepublic.com/uploads/thumbs/sweatshirt-blue-2-780d156565-16d6e9adb0a2068314106e9e24635830.jpeg"
                        alt="Other Item 3"
                        className="rounded-md"
                      />
                    </div>
                    <div
                      onClick={() => router.push("/vton")}
                      className="p-2 border rounded-md cursor-pointer"
                    >
                      <img
                        src="https://qazaqrepublic.com/uploads/thumbs/asty-street-beige-2-ed3e98d7ea-c66ffd72bb1b10c21800bec93237ed6b.jpeg"
                        alt="Other Item 4"
                        className="rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MyModals>
    </div>
  );
};

export default WeatherOutfit;
