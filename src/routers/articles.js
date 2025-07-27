import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';

import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  patchArticleController,
} from '../controllers/articles.js';

const articlesRouter = Router();

articlesRouter.use(authenticate);

articlesRouter.get('/', getAllArticlesController);

articlesRouter.get('/:articleId', isValidId, getArticleByIdController);

articlesRouter.post(
  '/',
  upload.single('img'),
  createArticleController,
);

articlesRouter.patch(
  '/:articleId',
  isValidId,
  upload.single('img'),
  patchArticleController,
);

articlesRouter.delete('/:articleId', isValidId, deleteArticleController);

export default articlesRouter;