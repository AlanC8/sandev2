import { Router } from "express";
import authRouter from "./auth/auth-router";
import generateOutfitRouter from "./generate_outfit/routes";
import idmvtonRouter from "./idmvton/routes";
import autoparsersRouter from "./autoparsers/routes";
// other routers can be imported here

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(generateOutfitRouter);
globalRouter.use(idmvtonRouter)
globalRouter.use(autoparsersRouter)
export default globalRouter;
