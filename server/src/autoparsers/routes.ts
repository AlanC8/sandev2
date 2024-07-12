import { Router } from "express";
import { kaspiParse } from "../parsers";

const autoparsersRouter = Router();

autoparsersRouter.post("/kaspi", async (req, res) => {
  try {
    const { url } = req.body;
    const imgs = await kaspiParse(url);
    res.json({ images: imgs });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default autoparsersRouter;
