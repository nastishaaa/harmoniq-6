import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { getAllArticles, getArticleById, createArticle, patchArticle, deleteArticle } from '../services/articles.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from 'http-errors';

export const getAllArticlesController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
        const { sortOrder, sortBy } = parseSortParams(req.query);
        const ownerId = req.user._id;
    const articles = await getAllArticles({ page, perPage, sortOrder, sortBy, ownerId });

    res.json({
            status: 200,
            message: 'Successfully found articles!',
            data: articles,
        });
};

export const getArticleByIdController = async (req, res) => {
    const ownerId = req.user._id;
    const { articleId } = req.params;

    const article = await getArticleById(articleId, ownerId);

    if (!article) {
        throw createHttpError(404, 'Article not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found article with id ${articleId}!`,
        data: article,
    });
};

export const createArticleController = async (req, res) => {
    const ownerId = req.user._id;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToCloudinary(photo);
        }
    }

        const article = await createArticle({ ...req.body, img: photoUrl }, ownerId);

        res.status(201).json({
            status: 201,
            message: 'Successfully created an article!',
            data: {
                ownerId,
                ...article.toObject(),
            }
        });
};

export const patchArticleController = async (req, res, next) => {
    const ownerId = req.user._id;
    const { articleId } = req.params;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToCloudinary(photo);
        }
    }

    const article = await patchArticle(articleId, ownerId, { ...req.body, photo: photoUrl });
    if (!article) {
        return next(createHttpError(404, 'Article not found!'));
    }
    res.status(200).json({
        status: 200,
        message: "Successfully patched an article!",
        data: article,
    });
};

export const deleteArticleController = async (req, res, next) => {
    const ownerId = req.user._id;
    const { articleId } = req.params;

    const article = await deleteArticle(articleId, ownerId);

    if (!article) {
        return next(createHttpError(404, 'Article not found!'));
    }

    res.status(204).send();
};