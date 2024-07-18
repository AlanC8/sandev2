import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import { logger } from "./logger";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use("/api/v1/", globalRouter);

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

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
