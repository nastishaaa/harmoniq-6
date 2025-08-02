import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto, { randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';

import User from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';
import { ENV_VARS } from '../constants/envVars.js';
import { TEMPLATE_DIR } from '../constants/paths.js';

const resetPasswordTemplate = fs
  .readFileSync(path.join(TEMPLATE_DIR, 'reset-password-email-template.html'))
  .toString();

const createSession = () => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
});

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
   const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(401, 'User not found');
    }

    const isEqual = await bcrypt.compare(payload.password, user.password); 
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }

    await Session.deleteOne({ userId: user._id });
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return await Session.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    });
  // const user = await User.findOne({ email: payload.email }).select('+password');

  // if (!user) {
  //   throw createHttpError(401, 'User login and password does not match!');
  // }
  
  // const arePasswordsEqual = await bcrypt.compare(
  //   payload.password,
  //   user.password,
  // );

  // if (!arePasswordsEqual) {
  //   throw createHttpError(401, 'User login and password does not match!');
  // }

  // await Session.findOneAndDelete({ userId: user._id });

  // await Session.create({
  //   ...createSession(),
  //   userId: user._id,
  // });

  // // return session;
  // return await User.create({
  //       ...payload,
  //   });
};

export const logoutUser = async (sessionId, sessionToken) => {
  await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const refreshSession = async (sessionId, sessionToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(sessionId);

    throw createHttpError(401, 'Session expired!');
  }

  await Session.findByIdAndDelete(sessionId);

  const newSession = await Session.create({
    ...createSession(),
    userId: session.userId,
  });

  return newSession;
};

export const requestResetPasswordEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    getEnvVar(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '2m',
    },
  );

  const template = Handlebars.compile(resetPasswordTemplate);

  const html = template({
    name: user.name,
    link: `${getEnvVar(
      ENV_VARS.FRONTEND_DOMAIN,
    )}/reset-password?token=${token}`,
  });

  const success = await sendEmail({
    email,
    html,
    subject: 'Reset your password!',
  });
  if (!success) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async ({ token, password }) => {
  let tokenPayload;

  try {
    tokenPayload = jwt.verify(token, getEnvVar(ENV_VARS.JWT_SECRET));
  } catch (err) {
    console.log(err);
    throw createHttpError(401, 'Token is expired or invalid');
  }

  const user = await User.findById(tokenPayload.sub);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(tokenPayload.sub, { password: hashedPassword });
  await Session.findOneAndDelete({ userId: tokenPayload.sub });
};
