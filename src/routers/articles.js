import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { articleValidationSchema } from '../validation/articles.js';
import { upload } from '../middlewares/multer.js';
import { attachImg } from '../middlewares/attachImg.js';

import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  patchArticleController,
} from '../controllers/articles.js';

const articlesRouter = Router();

// articlesRouter.use(authenticate);

articlesRouter.get('/', getAllArticlesController);

articlesRouter.get('/:articleId', isValidId, getArticleByIdController);

articlesRouter.post(
  '/',
  authenticate,
  upload.single('img'),
  attachImg,
  validateBody(articleValidationSchema),
  createArticleController,
);

articlesRouter.patch(
  '/:articleId',
  isValidId,
  authenticate,
  upload.single('img'),
  attachImg,
  validateBody(articleValidationSchema),
  patchArticleController,
);

articlesRouter.delete('/:articleId', isValidId, authenticate, deleteArticleController);

export default articlesRouter;
