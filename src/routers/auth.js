import { Router } from 'express';
import {
  loginUserController,
  logoutUserContrller,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';

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

export default authRouter;
