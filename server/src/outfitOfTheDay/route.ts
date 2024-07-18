import { Router } from "express";
import { generateOutfit, getCityFromCoordinates, getWeather } from "./cron";
import { Outfit, Weather } from "./models";


const WeatherRouter = Router();
WeatherRouter.get("/weather-outfit", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const city = await getCityFromCoordinates(parseFloat(lat as string) , parseFloat(lon as string));
    const today = new Date().setHours(0, 0, 0, 0);

    let weather = await Weather.findOne({ date: today, city });
    let outfit = await Outfit.findOne({ date: today, city });

    if (!weather || !outfit) {
      const weatherData = await getWeather(city);
      weather = new Weather({
        date: today,
        city,
        temperature: weatherData.temperature,
        description: weatherData.description,
      });
      await weather.save();

      const outfitData = await generateOutfit({ city, ...weatherData }); // Добавляем city в weatherData
      outfit = new Outfit({
        date: today,
        city,
        headwear: outfitData.headwear,
        topwear: outfitData.topwear,
        bottom: outfitData.bottom,
      });
      await outfit.save();
    }

    res.json({ weather, outfit });
  } catch (error) {
    console.error("Error fetching weather or outfit data:", error);
    res.status(500).json({ error: error });
  }
});

export default WeatherRouter;