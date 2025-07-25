
import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/index.js';

let swaggerDoc;

try {
  swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
} catch (e) {
  console.error("❌ Failed to load swagger docs:", e.message);
  swaggerDoc = null;
}

export const swaggerServe = swaggerUI.serve;

export const swaggerDocs = swaggerDoc
  ? swaggerUI.setup(swaggerDoc)
  : (req, res, next) => next(createHttpError(500, "Can't load swagger docs"));
