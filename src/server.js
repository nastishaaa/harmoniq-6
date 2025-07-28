import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './middlewares/swagger.js';
import authRouter from './routers/auth.js';
import router from './routers/index.js';
import { swaggerDocs, swaggerServe } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const startServer = async () => {
  const app = express();
  app.use('/api-docs', setupSwagger());
  app.use('/api-docs', swaggerServe, swaggerDocs);
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/auth', authRouter);
  app.use('/', router);
    
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
