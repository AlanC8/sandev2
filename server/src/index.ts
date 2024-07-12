import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import { logger } from "./logger";
import cors from "cors";
import cron from "node-cron";
import { Pinecone } from "@pinecone-database/pinecone";
import axios from "axios";
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use("/api/v1/", globalRouter);

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

app.get("/fetch-image", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await axios.get(url as string, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"];
    res.set("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
});

// zaraLangchain()
// getZaraDress()
// pinterestPins("cats")
// getOutfit()
app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
