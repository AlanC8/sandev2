interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface Weather {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

async function getUserLocation(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

async function getWeather(
  latitude: number,
  longitude: number
): Promise<Weather> {
  const apiKey = "ddc719036de34d2ebae161304241507"; // Замените на ваш API ключ
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getUserCityWeather(): Promise<void> {
  try {
    const location = await getUserLocation();
    const weather = await getWeather(location.latitude, location.longitude);
    console.log(`Temperature: ${weather.current.temp_c}°C`);
    console.log(`Weather: ${weather.current.condition.text}`);
  } catch (error) {
    console.error("Error getting user's weather:", error);
  }
}

export { getUserLocation, getWeather, getUserCityWeather };
