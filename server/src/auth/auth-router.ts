import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import AuthController from "./auth-controller";
import AuthService from "./auth-service";

const authRouter = Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single('userImage');

const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post("/register" , authController.registerUser);
authRouter.post("/registerv2", uploadMiddleware , authController.registerUserV2);
authRouter.post("/login", authController.loginUser);
authRouter.post("/refresh-token", authController.refreshToken);

export interface UserRequest {
  id: string;
  email: string;
  username: string;
  password: string;
}

authRouter.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = req.user as UserRequest;
    console.log("Authenticated user:", user);
    res.json(user);
  } catch (error) {
    console.error("Error in /auth/me route:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

authRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You have access to this route!" });
});

export default authRouter;
