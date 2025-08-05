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

export const getAllAuthors = async (page = 1, perPage = 20) => {

  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    User.find({}, 'name avatarUrl').skip(skip).limit(perPage),
    User.countDocuments(),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      perPage,
      hasMore: page * perPage < total,
    },
  };
};

export const getAuthorById = async (id) => {
  const author = await User.findById(id).select('name avatarUrl');
  if (!author) throw createHttpError(404, 'Author not found');
  return author;
};

export const getArticlesByAuthorId = async (id, page = 1, perPage = 12) => {
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    Article.find({ ownerId: id }).skip(skip).limit(perPage),
    Article.countDocuments({ ownerId: id }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      perPage,
      hasMore: page * perPage < total,
    },
  };
};

export const updateCurrentUser = async (userId, updateData) => {
  const allowedFields = ['name', 'avatarUrl'];
  const filteredData = {};

  for (const key of allowedFields) {
    if (updateData[key] !== undefined) {
      filteredData[key] = updateData[key];
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
    select: '-password',
  });

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
