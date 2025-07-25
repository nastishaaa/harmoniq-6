import { Article } from "../db/models/article.js";
import { SORT_ORDER } from "../index.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllArticles = async ({ page, perPage, sort,
    sortOrder = SORT_ORDER.ASC,
    sortBy = 'rate', ownerId }) => {
    
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const articlesQuery = Article.find({ ownerId });
    const articlesCount = await Article.find().merge(articlesQuery).countDocuments();
    
    const articles = await articlesQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
    
    const paginationData = calculatePaginationData(articlesCount, page, perPage);

    if (page > paginationData.totalPages && articlesCount > 0) {
        const err = new Error(`Page ${page} does not exist. Only ${paginationData.totalPages} pages available.`);
        err.status = 404;
        throw err;
    }
    return {
        data: articles,
        ...paginationData,
    };
};

export const getArticleById = async (articleId, ownerId) => {
    const article = await Article.findOne({ _id: articleId, ownerId });
    return article;
};

export const createArticle = async (payload, ownerId) => {
    const article = await Article.create({ ...payload, ownerId });
    return article;
};

export const patchArticle = async (articleId, ownerId, payload) => {
    const article = await Article.findOneAndUpdate({ _id: articleId, ownerId }, payload, { new: true });
    return article;
};

export const deleteArticle = async (articleId, ownerId) => {
    const article = await Article.findOneAndDelete({ _id: articleId, ownerId });
    return article;
};