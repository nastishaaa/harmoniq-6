import express from 'express';
import {
  getCurrentUser,
  getSavedArticles,
  getCreatedArticles,
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/user.controller.js';
// import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// router.use(authenticate);

router.get('/me', getCurrentUser);
router.get('/me/saved-articles', getSavedArticles);
router.get('/me/created-articles', getCreatedArticles);
router.post('/me/saved-articles/:articleId', addSavedArticle);
router.delete('/me/saved-articles/:articleId', removeSavedArticle);

export default router;
