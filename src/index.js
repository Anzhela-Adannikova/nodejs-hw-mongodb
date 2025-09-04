import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

// const startApp = async () => {
//   try {
//     await initMongoConnection();
//     setupServer();
//   } catch (err) {
//     console.log('Ooops, start error', err);
//     throw err;
//   }
// };
// startApp();
import dotenv from 'dotenv';
dotenv.config();

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

void bootstrap();
