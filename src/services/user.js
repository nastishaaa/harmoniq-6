import User from '../db/models/user.js';
import { Article } from '../db/models/article.js';
import createHttpError from 'http-errors';

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw createHttpError(404, 'User not found');
  return user;
};

export const getSavedArticles = async (userId) => {
  const user = await User.findById(userId).populate('savedArticles');
  return user.savedArticles;
};

export const getCreatedArticles = async (userId) => {
  const articles = await Article.find({ ownerId: userId });
  return articles;
};

export const addSavedArticle = async (userId, articleId) => {
  const user = await User.findById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  const alreadySaved = user.savedArticles.some(
    (id) => id.toString() === articleId,
  );
  if (alreadySaved) throw createHttpError(409, 'Article already saved');

  user.savedArticles.push(articleId);
  return await user.save();
};

export const removeSavedArticle = async (userId, articleId) => {
  const user = await User.findById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  user.savedArticles.pull(articleId);
  return await user.save();
};

export const getAllAuthors = async () => {
  return await User.find({}, 'name avatarUrl');
};
