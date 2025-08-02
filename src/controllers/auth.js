import User from '../db/models/user.js';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetPasswordEmail,
  resetPassword,
} from '../services/auth.js';

const setupSessionCookies = (session, res) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: false,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: false,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  const user = await User.findById(session.userId).select('-password');
  setupSessionCookies(session, res);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      token: session.accessToken,
      refreshToken: session.refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl,
        articlesAmount: user.articlesAmount,
        savedArticles: user.savedArticles,
      },
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  await logoutUser(sessionId, refreshToken);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  setupSessionCookies(session, res);

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const requestResetPasswordEmailController = async (req, res) => {
  const { email } = req.body;

  await requestResetPasswordEmail(email);

  res.send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).send({
    status: 200,
    message: 'Successfully reset password!',
    data: {},
  });
};
