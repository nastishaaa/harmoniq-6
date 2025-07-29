import Joi from 'joi';

export const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(32).trim().optional().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 32 characters',
    'string.empty': 'Name cannot be empty',
  }),

  avatarUrl: Joi.string().uri().allow('', null).optional().messages({
    'string.uri': 'Avatar URL must be a valid URI',
  }),
});
