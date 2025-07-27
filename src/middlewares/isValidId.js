import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
    const { articleId } = req.params;
    if (!isValidObjectId(articleId)) {
        return res.status(400).json({
            status: 400,
            message: `${articleId} is not a valid id`,
        });
    }
    next();
};