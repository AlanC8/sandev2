// upload-middleware.ts
import multer from "multer";
import { Request } from "express";
import { UTApi } from "uploadthing/server";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single("file");

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

export const utapi = new UTApi();

