export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const err = new Error(error.message);
            err.status = 400;
            return next(err);
        }
        next();
    };
};