import { Router } from 'express';
import articlesRouter from './articles.js';
import userRouter from './user.js';
import authRouter from './auth.js';

const router = Router();

router.use('/articles', articlesRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
