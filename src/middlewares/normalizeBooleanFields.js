export const normalizeBooleanFields = (fields = []) => {
  return (req, res, next) => {
    fields.forEach((field) => {
      if (field in req.body) {
        const value = req.body[field];
        if (value === 'true') req.body[field] = true;
        else if (value === 'false') req.body[field] = false;
      }
    });
    next();
  };
};
