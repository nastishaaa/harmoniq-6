export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      convert: false,
      allowUnknown: false,
    });
    next();
  } catch (error) {
    next(error);
  }
};
