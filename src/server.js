import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './middlewares/swagger.js';

import { swaggerDocs, swaggerServe } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const startServer = async () => {
  const app = express();
  app.use('/api-docs', setupSwagger());
  app.use('/docs', swaggerServe, swaggerDocs);
  app.use(express.json());
  app.use(cors(
    {
      //потім додати живу сторінку
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:5174',
        'https://harmoniq-6-frontend.vercel.app'],
  credentials: true
}
  ));
  app.use(cookieParser());
  app.use('/', router);
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`My Swagger:       http://localhost:${PORT}/api-docs`);
    console.log(`Team Swagger:       http://localhost:${PORT}/docs`);
  });
};
