
import { Router } from "express";
import articlesRouter from "./articles.js";
import userRouter from './user.js';
const router = Router();

router.use('/articles', articlesRouter);
// router.use('/auth',);
router.use('/api/users', userRouter);


export default router;
