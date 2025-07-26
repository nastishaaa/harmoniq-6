<<<<<<< HEAD
import { Router } from 'express';
=======

import { Router } from "express";
import articlesRouter from "./articles.js";
>>>>>>> origin/main
import userRouter from './user.js';
const router = Router();

router.use('/articles', articlesRouter);
// router.use('/auth',);
router.use('/api/users', userRouter);

<<<<<<< HEAD
=======

>>>>>>> origin/main
export default router;
