import * as userService from '../services/user.js';

export const getCurrentUser = async (req, res) => {
  const user = await userService.getCurrentUser(req.user._id);
  res.json(user);
};

export const getSavedArticles = async (req, res) => {
  const articles = await userService.getSavedArticles(req.user._id);
  res.json(articles);
};

export const getCreatedArticles = async (req, res) => {
  const articles = await userService.getCreatedArticles(req.user._id);
  res.json(articles);
};

export const addSavedArticle = async (req, res) => {
  const updatedUser = await userService.addSavedArticle(
    req.user._id,
    req.params.articleId,
  );
  res.status(201).json(updatedUser.savedArticles);
};

export const removeSavedArticle = async (req, res) => {
  const updatedUser = await userService.removeSavedArticle(
    req.user._id,
    req.params.articleId,
  );
  res.status(200).json(updatedUser.savedArticles);
};

export const getAllAuthors = async (req, res) => {
  const authors = await userService.getAllAuthors();
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched all authors!',
    data: authors,
  });
};
