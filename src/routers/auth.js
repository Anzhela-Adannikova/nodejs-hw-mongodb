import { Router } from 'express';
import {
  loginUserController,
  logoutUserContrller,
  refreshSessionController,
  registerUserController,
  resetPasswordController,
  sendResetEmailController,
} from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';
import { sendResetEmailValidationSchema } from '../validation/sendResetEmailValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);

authRouter.post('/auth/logout', logoutUserContrller);

authRouter.post('/auth/refresh-session', refreshSessionController);

authRouter.post(
  '/auth/send-reset-email',
  validateBody(sendResetEmailValidationSchema),
  sendResetEmailController,
);

authRouter.post(
  '/auth/reset-password',
  validateBody(resetPasswordValidationSchema),
  resetPasswordController,
);

export default authRouter;
