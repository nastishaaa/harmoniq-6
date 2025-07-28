import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import { getEnvVar } from './getEnvVar.js';

cloudinary.v2.config({
  cloud_name: getEnvVar('CLOUD_NAME'),
  api_key: getEnvVar('API_KEY'),
  api_secret: getEnvVar('API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('Missing required parameter - file');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: 'contacts' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
