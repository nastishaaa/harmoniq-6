import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { userUpdateSchema } from '../validation/userUpdate.js';
import {
  getCurrentUser,
  updateCurrentUser,
  getSavedArticles,
  getCreatedArticles,
  addSavedArticle,
  removeSavedArticle,
  getAllAuthors,
  getAuthorById,
  getArticlesByAuthorId,
} from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/me', authenticate, getCurrentUser);
router.get('/:id/articles', getArticlesByAuthorId);
router.get('/:id', getAuthorById);

router.use(authenticate);
router.patch('/me', validateBody(userUpdateSchema), updateCurrentUser);
router.get('/me/saved-articles', getSavedArticles);
router.get('/me/created-articles', getCreatedArticles);
router.post('/me/saved-articles/:articleId', addSavedArticle);
router.delete('/me/saved-articles/:articleId', removeSavedArticle);

export default router;
