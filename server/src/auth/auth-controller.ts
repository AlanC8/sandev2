import { Request, Response } from "express";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import AuthService from "./auth-service";
import { uuid } from "uuidv4";
import { utapi } from "../middlewares/upload-middleware";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto: CreateUserDto = req.body;
      const user = await this.authService.registerUser(createUserDto);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error registering user" });
    }
  };

  registerUserV2 = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Request received:", req.body, req.file);
  
      if (!req.file) {
        res.status(400).json({ message: "No image file provided" });
        return;
      }
  
      const fileName = uuid();
      const file = new File([req.file.buffer], fileName, {
        type: req.file.mimetype,
      });
  
      const { data, error } = await utapi.uploadFiles(file);
  
      if (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Error uploading image" });
        return;
      }
  
      if (!data?.url) {
        res.status(500).json({ message: "Error uploading image, no URL returned" });
        return;
      }
  
      const createUserDto: CreateUserDto = {
        ...req.body,
        userImage: data.url,
      };
  
      const user = await this.authService.registerUserV2(createUserDto);
      res.status(201).json(user);
    } catch (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ message: "Error registering user" });
    }
  };
  
  

  loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.loginUser(email, password);
      if (!result) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error logging in" });
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;
      const result = await this.authService.refreshToken(token);
      if (!result) {
        res.status(401).json({ message: "Invalid or expired refresh token" });
        return;
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error refreshing token" });
    }
  };
}

export default AuthController;
