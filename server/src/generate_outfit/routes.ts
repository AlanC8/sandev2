import { json, Router } from "express";
import Openai from "openai";
const generateOutfitRouter = Router();
import bottom from "../uploads/bottom.json";
import headwear from "../uploads/headwear.json";
import hoodies from "../uploads/hoodies.json";
import shirt from "../uploads/shirt.json";
import sweatshirts from "../uploads/sweatshirts.json";
import tshirts from "../uploads/t-shirts.json";
import OutFitGenerator from "./model";
import authMiddleware from "../middlewares/auth-middleware";
import zara_dresses from "../../zara_dresses.json";
import { User } from "../auth/types/response";
import { uploadMiddleware, utapi } from "../middlewares/upload-middleware";
import { uuid } from "uuidv4";

export const openai = new Openai({
  apiKey: process.env.API_KEY,
});

generateOutfitRouter.post("/generate", authMiddleware, async (req, res) => {
  try {
    const systemPrompt = `
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
    const { userPrompt } = req.body;
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
      const parsedRes = JSON.parse(resJson);
      const { headwear, topwear, bottom } = parsedRes;
      const newOutfit = new OutFitGenerator({
        title: userPrompt,
        headwear,
        topwear,
        bottom,
        user: (req.user as User).id,
      });

      const savedOutfit = await newOutfit.save();
      res.json(parsedRes);
    } else {
      res.status(400).json({ message: "No valid response from AI" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});
generateOutfitRouter.post(
  "/generate-bypic",
  authMiddleware,
  uploadMiddleware,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const fileName = uuid();
      const file = new File([req.file.buffer], fileName, {
        type: req.file.mimetype,
      });

      await utapi.uploadFiles(file).then(async (fileResponse) => {
        if (!fileResponse.data) {
          return res.status(500).json({ error: fileResponse.error });
        } else {
          const imageUrl = fileResponse.data.url;
          const systemPrompt = `
      You are an advanced AI fashion assistant with access to up-to-date clothing data from various categories.
      You will generate stylish and personalized outfit recommendations based on user requests.
      The data for each category is stored in JSON files. 
      The JSON files are named after the following categories:
      
      - "bottom.json": ${JSON.stringify(bottom)}
      - "shirt.json": ${JSON.stringify(shirt)}
      - "t-shirts.json": ${JSON.stringify(tshirts)}
      - "hoodies.json": ${JSON.stringify(hoodies)}
      - "sweatshirts.json": ${JSON.stringify(sweatshirts)}
      - "headwear.json": ${JSON.stringify(headwear)}
      
      Each JSON file STRICTLY contains a collection of items with the following attributes:
      - "image": URL to the item's image
      - "name": Name of the item
      - "price": Price of the item
      - "label": Additional labels or descriptions
      
      Headwear, topwear, and bottom strictly must not be empty.

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

          console.log("Sending request to OpenAI with userLink:", imageUrl);

          const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Users picture: ${imageUrl}`,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: imageUrl,
                    },
                  },
                ],
              },
            ],
            response_format: {
              type: "json_object",
            },
          });

          console.log("Received response from OpenAI:", response);

          const resJson = response.choices[0]?.message?.content;
          if (resJson) {
            const parsedRes = JSON.parse(resJson);
            const outfit = new OutFitGenerator({
              headwear: parsedRes.headwear,
              topwear: parsedRes.topwear,
              bottom: parsedRes.bottom,
              title: parsedRes.topwear[0].name,
              user: (req.user as User).id, // Assuming user information is available from auth middleware
            });

            await outfit.save();
            res.json(parsedRes);
          } else {
            res.status(400).json({ message: "No valid response from AI" });
          }
        }
      });
    } catch (error) {
      console.error("Error in /generate-bypic route:", error);
      res.status(500).json({ error: error });
    }
  }
);

generateOutfitRouter.post("/image-link", uploadMiddleware, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileName = uuid();
  const file = new File([req.file.buffer], fileName, {
    type: req.file.mimetype,
  });

  const { data, error } = await utapi.uploadFiles(file);
  res.json(data);
});

generateOutfitRouter.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await OutFitGenerator.find({ user: (req.user as User).id });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

generateOutfitRouter.get("/history/:id", authMiddleware, async (req, res) => {
  try {
    const outfit = await OutFitGenerator.findOne({
      _id: req.params.id,
      user: (req.user as User).id,
    });
    if (!outfit) {
      return res.status(404).json({ message: "Outfit not found" });
    }
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

generateOutfitRouter.post("/magaz", async (req, res) => {
  const { magaz } = req.body;
  if (magaz === "qrep") {
    const qrep = jsonHelperFunc("qrep");
    res.json(qrep);
  } else if (magaz === "zara") {
    const zara = jsonHelperFunc("zara");
    res.json(zara);
  } else {
    res.json("something another");
  }
});

const jsonHelperFunc = (magaz: string) => {
  if (magaz === "qrep") {
    const qazrepArray = [
      {
        headwear: headwear,
        bottom: bottom,
        hoodies: hoodies,
        shirt: shirt,
        sweatshirts: sweatshirts,
        tshirts: tshirts,
      },
    ];
    return qazrepArray;
  } else if (magaz == "zara") {
    type SourceItem = {
      id: number;
      title: string;
      price: number;
      description: string;
      imageLink: string;
      colors: string;
    };

    type TargetItem = {
      image: string;
      name: string;
      price: string;
      label: string;
    };

    const transformData = (source: SourceItem[]): TargetItem[] => {
      return source.map((item) => ({
        image: item.imageLink.replace("{width}", "300"), // Предположим, ширина 300px
        name: item.title,
        price: `${item.price}₸`,
        label: item.colors,
      }));
    };
    const transformedData = transformData(zara_dresses);
    return { zara_dresses: transformedData.filter((_, i) => i < 60) };
  }
};

export default generateOutfitRouter;
