import { Router } from 'express';
import userRouter from './user.js';
const router = Router();

// router.use('/articles', );
// router.use('/auth',);
router.use('/api/users', userRouter);

export default router;
