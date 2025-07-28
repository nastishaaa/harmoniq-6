import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
