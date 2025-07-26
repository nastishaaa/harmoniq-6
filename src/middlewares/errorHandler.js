import multer from 'multer';
export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: 400,
      message: err.message,
      data: [],
    });
  }
  const status = err.status || 500;

  res.status(status).json({
    status,
    message: status === 500 ? 'Something went wrong' : err.message,
    data: [],
  });
};
