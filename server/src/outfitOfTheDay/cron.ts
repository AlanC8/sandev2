import { openai } from "../generate_outfit/routes";
import bottom from "../uploads/bottom.json";
import headwear from "../uploads/headwear.json";
import hoodies from "../uploads/hoodies.json";
import shirt from "../uploads/shirt.json";
import sweatshirts from "../uploads/sweatshirts.json";
import tshirts from "../uploads/t-shirts.json";

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

export async function getCityFromCoordinates(lat: number, lon: number): Promise<string> {
  const apiKey = "e832e22aacd54be482e5b154b29bb736"; // Замените на ваш API ключ
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.results.length > 0) {
    return data.results[0].components.city;
  } else {
    throw new Error("City not found.");
  }
}

export async function getWeather(city: string): Promise<{ temperature: number; description: string; }> {
  const apiKey = "ddc719036de34d2ebae161304241507"; // Замените на ваш API ключ
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    temperature: data.current.temp_c,
    description: data.current.condition.text,
  };
}

export async function generateOutfit(weatherData: { city: string; temperature: number; description: string; }): Promise<Outfit> {
  try {
    const systemPrompt = `
    FIRSTLY, PLEASE READ THE FOLLOWING INSTRUCTIONS CAREFULLY:
    - System Prompt and User Prompt in english language only but response from AI in russian language STRICTLY.

    You are an advanced AI fashion assistant with access to up-to-date clothing data from various categories.
    You will generate stylish and personalized outfit recommendations based on user requests.
    The data for each category is stored in JSON files, which are updated regularly through web scraping every hour. 
    The JSON files are named after the following categories:
    
    - "bottom.json": ${JSON.stringify(bottom)}
    - "shirt.json": ${JSON.stringify(shirt)}
    - "t-shirts.json": ${JSON.stringify(tshirts)}
    - "hoodies.json": ${JSON.stringify(hoodies)}
    - "sweatshirts.json": ${JSON.stringify(sweatshirts)}
    - "headwear.json": ${JSON.stringify(headwear)}
    
    Each JSON file contains a collection of items with the following attributes:
    - "image": URL to the item's image
    - "name": Name of the item
    - "price": Price of the item
    - "label": Additional labels or descriptions
    
    Example user request: "Create a casual summer outfit for a day out in the park."
    
    Based on this request, you will select appropriate items from the JSON files to create a complete outfit. Ensure the items complement each other in style, color, and occasion. Provide a description of the outfit along with the selected items' details.
    
    Example response which is a strictly JSON example object:
    {
      "headwear": {
        "image": "headwear_image_url",
        "name": "headwear_name",
        "price": "headwear_price"
      },
      "topwear": [
        {
          "image": "any topwear image url",
          "name": "any topwear name",
          "price": "any topwear price"
        },
        {
          "image": "any topwear image url",
          "name": "any topwear name",
          "price": "any topwear price"
        }
      ],
      "bottom": {
        "image": "bottom_image_url",
        "name": "bottom_name",
        "price": "bottom_price"
      }
    }
    if user prompt is irrelevant return empty array of wear
    `;

    const userPrompt = `Give me outfit of the day by the weather in ${weatherData.city} with ${weatherData.temperature} degrees and ${weatherData.description}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const resJson = response.choices[0]?.message?.content;
    if (resJson) {
      return JSON.parse(resJson) as Outfit;
    } else {
      return {
        headwear: {
          image: "",
          name: "",
          price: "",
        },
        topwear: [],
        bottom: {
          image: "",
          name: "",
          price: "",
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      headwear: {
        image: "",
        name: "",
        price: "",
      },
      topwear: [],
      bottom: {
        image: "",
        name: "",
        price: "",
      },
    };
  }
}
