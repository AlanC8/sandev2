import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { uploadMiddlewares, utapi } from "../middlewares/upload-files.mdlwr";
import Replicate from "replicate";
import authMiddleware from "../middlewares/auth-middleware";
import VTONImage from "./model";
const idmvtonRouter = Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export interface IDMUserRequest {
  id: string;
  email: string;
  username: string;
  password: string;
  userImage: string;
}

idmvtonRouter.post(
  "/vton",
  authMiddleware,
  uploadMiddlewares,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as IDMUserRequest;
      if (
        !req.files ||
        !("human_img" in req.files) ||
        !("garm_img" in req.files)
      ) {
        return res
          .status(400)
          .json({ error: "No file uploaded or missing files" });
      }

      const { category } = req.body;

      const human_img = (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      ).human_img[0];
      const garm_img = (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      ).garm_img[0];

      const humanImgName = `${uuid()}_${human_img.originalname}`;
      const garmImgName = `${uuid()}_${garm_img.originalname}`;

      const humanImgFile = new File([human_img.buffer], humanImgName, {
        type: human_img.mimetype,
      });
      const garmImgFile = new File([garm_img.buffer], garmImgName, {
        type: garm_img.mimetype,
      });

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

      console.log("Replicate inputs:", inputs);

      try {
        const output = await replicate.run(
          "cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f",
          { input: inputs }
        );

        const newImage = new VTONImage({
          userId: user.id,
          humanImgUrl: humanImgUrlStr,
          garmImgUrl: garmImgUrlStr,
          outputImageUrl: output,
        });
        await newImage.save();

        res.json({ output });
      } catch (replicateError: any) {
        console.error("Error from Replicate API:", replicateError);
        console.error(
          "Replicate Error Response:",
          replicateError.response?.data
        );
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
  }
);

idmvtonRouter.post(
  "/vton-extension",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as IDMUserRequest;

      if (!user) {
        console.error("User not Authorized");
        return res.status(401).json({ error: "User not Authorized" });
      }

      if (!user.userImage) {
        console.error("User image not found");
        return res.status(400).json({ error: "User image not found" });
      }

      const { imageLink, category } = req.body;

      if (!imageLink || !category) {
        console.error("Missing imageLink or category in request body");
        return res
          .status(400)
          .json({ error: "Missing imageLink or category in request body" });
      }

      console.log("Inputs to replicate.run:", {
        crop: false,
        seed: 42,
        steps: 30,
        category: category,
        force_dc: false,
        garm_img: imageLink,
        human_img: user.userImage,
        garment_des: uuid(),
      });

      const inputs = {
        crop: false,
        seed: 42,
        steps: 30,
        category: category,
        force_dc: false,
        garm_img: imageLink,
        human_img: user.userImage,
        garment_des: uuid(),
      };

      const output = await replicate.run(
        "cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f",
        { input: inputs }
      );
      const newImage = new VTONImage({
        userId: user.id,
        humanImgUrl: user.userImage,
        garmImgUrl: imageLink,
        outputImageUrl: output,
      });
      await newImage.save();

      res.json({ output });
    } catch (error) {
      console.error("Error in vton-extension route:", error);
      res.status(500).json({ error: "Error in vton-extension route" });
    }
  }
);

idmvtonRouter.get(
  "/user-generations",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as IDMUserRequest;
      const userGenerations = await VTONImage.find({ userId: user.id });

      if (!userGenerations.length) {
        return res.status(404).json({ error: "No generations found for this user" });
      }

      res.json(userGenerations);
    } catch (error) {
      console.error("Error fetching user generations:", error);
      res.status(500).json({ error: "Error fetching user generations" });
    }
  }
);

export default idmvtonRouter;
