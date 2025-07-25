import { Router } from "express";
import articlesRouter from "./articles.js";

const router = Router();

router.use('/articles', articlesRouter);
// router.use('/auth',);
// router.use('/user',);

export default router;