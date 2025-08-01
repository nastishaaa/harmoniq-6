import multer from 'multer';

const storage = multer.memoryStorage();

const limits = {
  fileSize: 1 * 1024 * 1024, 
};

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'));
  }
  cb(null, true);
};

export const upload = multer({ storage, limits, fileFilter });
