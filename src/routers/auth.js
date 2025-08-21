import { Router } from 'express';
import {
  loginUserController,
  logoutUserContrller,
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

// authRouter.post('/auth/refresh-session');

export default authRouter;

// Створіть роут POST /auth/register для реєстрації нового користувача.
// Тіло запиту має в себе включати наступні властивості:

// name - обов’язково
// email - обов’язково
// password - обов’язково (памʼятайте, що пароль має бути
// захешованим за допомогою бібліотеки bcrypt)

// Обробка цього роута має включати:

// Реєстрацію роута в файлі src/routers/auth.js
// Валідацію отриманих даних
// Опис контролера для цього роута в файлі src/controllers/auth.js
// Створення сервісу в файлі src/services/auth.js
// Переконайтеся, що користувач із такою поштою ще не існує в системі,
// поверніть за допомогою бібілотеки createHttpError 409 помилку
// в іншому випадку і повідомлення 'Email in use’.
// Відповідь сервера, в разі успішного створення нового користувача,
// має бути зі статусом 201 і містити об’єкт з наступними властивостями:
// status — статус відповіді
// message — повідомлення про результат виконання операції
// "Successfully registered a user!"
// data — дані створеного користувача (має бути відсутнє поле з паролем!)
