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
  const { page = 1, perPage = 10 } = req.query;
  const result = await userService.getAllAuthors(Number(page), Number(perPage));
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched authors!',
    data: result.data,
    pagination: result.pagination,
  });
};

export const getAuthorById = async (req, res) => {
  const author = await userService.getAuthorById(req.params.id);
  res.status(200).json(author);
};

export const getArticlesByAuthorId = async (req, res) => {
  const { page = 1, perPage = 12 } = req.query;
  const result = await userService.getArticlesByAuthorId(
    req.params.id,
    Number(page),
    Number(perPage),
  );
  res.status(200).json({
    status: 200,
    message: `Successfully fetched articles by author ${req.params.id}`,
    data: result.data,
    pagination: result.pagination,
  });
};

export const updateCurrentUser = async (req, res) => {
  const updatedUser = await userService.updateCurrentUser(
    req.user._id,
    req.body,
  );
  res.status(200).json({
    status: 200,
    message: 'Successfully updated user data!',
    data: updatedUser,
  });
};
