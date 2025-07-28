import Joi from 'joi';

export const articleValidationSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(48)
        .required()
        .messages({
            'string.empty': 'The article title is required',
            'string.min': 'The title must be at least 3 characters long',
            'string.max': 'The title must not exceed 48 characters',
        }),

    desc: Joi.string()
        .min(100)
        .max(4000)
        .required()
        .messages({
            'string.empty': 'The article description is required',
            'string.min': 'The description must be at least 100 characters long',
            'string.max': 'The description must not exceed 4000 characters',
        }),

    img: Joi.string()
        .required()
        .messages({
            'string.empty': 'The article image is required',
        }),

    date: Joi.date()
        .iso()
        .required()
        .messages({
            'any.required': 'The date is required',
            'date.format': 'The date must be in YYYY-MM-DD format',
        }),

    author: Joi.string()
        .min(4)
        .max(50)
        .required()
        .messages({
            'string.empty': 'The author field is required',
            'string.min': 'The author name must be at least 4 characters long',
            'string.max': 'The author name must not exceed 50 characters',
        }),
});