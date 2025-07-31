import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getContactId, getContacts } from './service/contacts.js';
import { ENV_VARS } from './constants/envVars.js';

dotenv.config();

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  app.get('/contacts', async (req, res) => {
    const contacts = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactId(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  const PORT = Number(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer();

// Створіть в корні проєкта папку src.

// В папці src створіть файл із назвою server.js. В ньому буде знаходитись
// логіка роботи вашого express-серверу.

// В файлі src/server.js створіть функцію setupServer,
// в якій буде створюватись express сервер. Ця функція має в себе включати:

// Створення серверу за допомогою виклику express()
// Налаштування cors та логгера pino.
// Обробку неіснуючих роутів (повертає статус 404 і відповідне повідомлення)
// {
//   message: 'Not found',
// }

// 4. Запуск серверу на порті, вказаному через змінну
// оточення PORT або 3000, якщо такої змінної не зазначено

// 5. При вдалому запуску сервера виводити в консоль рядок
// “Server is running on port {PORT}”, де {PORT} - це номер вашого порту.

// Не забудьте вказати змінну оточення в файлі .env.example

// Створіть файл src/index.js. Імпортуйте і викличте у ньому функцію setupServer.

// Крок 5

// Створіть роут GET /contacts, який буде повертати масив
// усіх контактів. Обробка цього роута має включати:

// Реєстрацію роута в файлі src/server.js
// Опис контролера для цього роута
// Створення сервісу в папці src/services у файлі із відповідним
// сутності іменем(в данному випадку contacts.js)
// Відповідь сервера має містити об’єкт з наступними властивостями:
// {
//   status: 200,
//   message: "Successfully found contacts!",
//   data:
//       // дані, отримані в результаті обробки запиту
// }

// Крок 6

// Створіть роут GET /contacts/:contactId, який буде повертати дані
// контакту за переданим ID або повертати помилку 404, якщо контакт не знайдено.
// Обробка цього роута має включати:

// Реєстрацію роута в файлі src/server.js
// Опис контролера для цього роута
// Створення сервісу в папці src/services у файлі з відповідним
// іменем сутності (в даному випадку contacts.js)
// Відповідь сервера, якщо контакт було знайдено, має бути зі с
// татусом 200 та містити об’єкт з наступними властивостями:

// {
// 	status: 200,
// 	message: "Successfully found contact with id {contactId}!",
// 	data: {
// 		// об'єкт контакту
//       }
// }

// Додайте перевірку чи контакт за переданим ідентифікатором було знайдено.
// Якщо контакт не було знайдено, то поверніть відповідь зі статусом 404 і наступним об’єктом:

// {
// 	message: 'Contact not found',
// }

// На даному етапі не потрібно перевіряти невалідний MongoDB ID у цьому модулі.
// Припускаємо, що ID завжди валідний
