import { startServer } from './server.js';
import { initMongoConnections } from './db/initMongoConnection.js';

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
};

const bootstrap = async () => {
    await initMongoConnections();
    startServer();
};

bootstrap();