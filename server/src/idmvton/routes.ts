import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { uploadMiddlewares, utapi } from "../middlewares/upload-files.mdlwr";
import Replicate from "replicate";

const idmvtonRouter = Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

idmvtonRouter.post("/vton", uploadMiddlewares, async (req: Request, res: Response) => {
  try {
    if (!req.files || !('human_img' in req.files) || !('garm_img' in req.files)) {
      return res.status(400).json({ error: "No file uploaded or missing files" });
    }

    const { category } = req.body;

    const human_img = (req.files as { [fieldname: string]: Express.Multer.File[] }).human_img[0];
    const garm_img = (req.files as { [fieldname: string]: Express.Multer.File[] }).garm_img[0];

    const humanImgName = `${uuid()}_${human_img.originalname}`;
    const garmImgName = `${uuid()}_${garm_img.originalname}`;

    const humanImgFile = new File([human_img.buffer], humanImgName, { type: human_img.mimetype });
    const garmImgFile = new File([garm_img.buffer], garmImgName, { type: garm_img.mimetype });

    const humanImgUrl = await utapi.uploadFiles(humanImgFile);
    const garmImgUrl = await utapi.uploadFiles(garmImgFile);

    // Ensure URLs are valid and log them
    const humanImgUrlStr = humanImgUrl.data?.url;
    const garmImgUrlStr = garmImgUrl.data?.url;

    if (!humanImgUrlStr || !garmImgUrlStr) {
      return res.status(500).json({ error: "Failed to upload images" });
    }

    // Log the inputs to replicate.run
    const inputs = {
      crop: false,
      seed: 42,
      steps: 30,
      category: category || "upper_body",
      force_dc: false,
      garm_img: garmImgUrlStr,
      human_img: humanImgUrlStr,
      garment_des: uuid(),
    };

    console.log('Replicate inputs:', inputs);

    try {
      const output = await replicate.run(
        "cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f",
        { input: inputs }
      );
      res.json({ output });
    } catch (replicateError: any) {
      console.error("Error from Replicate API:", replicateError);
      console.error("Replicate Error Response:", replicateError.response?.data);
      console.error("Replicate Error Request:", replicateError.request);
      res.status(500).json({ error: replicateError.message });
    }
  } catch (error: any) {
    console.error("Error during API call:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    res.status(500).json({ error: error.message });
  }
});

export default idmvtonRouter;
