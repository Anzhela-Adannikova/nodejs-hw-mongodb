import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.log('Ooops, start error', err);
    throw err;
  }
};
startApp();
