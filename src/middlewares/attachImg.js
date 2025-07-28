export const attachImg = (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.originalname;
  }
  next();
};
