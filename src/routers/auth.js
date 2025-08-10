import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { requestResetPasswordEmailValidationSchema } from '../validation/requestResetPasswordEmailValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';
import { upload } from '../middlewares/multer.js';

const authRouter = Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);
authRouter.post('/logout', logoutUserController);
// authRouter.get('/refresh', refreshSessionController);
authRouter.post('/refresh', refreshSessionController);

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordEmailValidationSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordValidationSchema),
  resetPasswordController,
);

export default authRouter;
