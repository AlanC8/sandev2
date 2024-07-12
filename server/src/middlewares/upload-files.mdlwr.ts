import multer from 'multer';
import { UTApi } from 'uploadthing/server';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddlewares = upload.fields([
  { name: 'human_img', maxCount: 1 },
  { name: 'garm_img', maxCount: 1 },
]);

declare global {
  namespace Express {
    interface Request {
      files?: {
        [fieldname: string]: Express.Multer.File[];
      } | Express.Multer.File[];
    }
  }
}

export const utapi = new UTApi();
