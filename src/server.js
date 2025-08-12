import express, { json } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { ENV_VARS } from './constants/envVars.js';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(json());

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
