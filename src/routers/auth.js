import { Router } from 'express';
import {
  authorizeWithGoogleController,
  getGoogleOauthUrlController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validate-body-middleware.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { requestResetPasswordEmailValidationSchema } from '../validation/requestResetPasswordEmailValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';
import { authorizeWithGoogleOAuthValidationSchema } from '../validation/authorize-with-google-ouath.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);
authRouter.post('/logout', logoutUserController);
authRouter.get('/refresh', refreshSessionController);
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
authRouter.post('/get-google-oauth-link', getGoogleOauthUrlController);
authRouter.post(
  '/authorize-with-google-oauth',
  validateBody(authorizeWithGoogleOAuthValidationSchema),
  authorizeWithGoogleController,
);

export default authRouter;