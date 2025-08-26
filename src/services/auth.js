import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const createSession = (userId) => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), //15 хв
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 днів
  userId,
});

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'User with this email already registered!');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: encryptedPassword,
  });

  return user;
};

// логінимо користувача
export const loginUser = async ({ email, password }) => {
  //   перевіряємо чи є він в базі
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'User with given credentials does not exist!');
  }

  // перевіряємо, чи співпадають паролі
  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'User with given credentials does not exist!');
  }

  // видаляємо стару сесію
  await Session.deleteOne({ userId: user._id });

  // створюємо нову сесію
  const session = await Session.create(createSession(user._id));

  return session;
};

export const logoutUser = async (sessionId) => {
  await Session.findByIdAndDelete(sessionId);
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    await Session.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session not found!');
  }

  await Session.findByIdAndDelete(sessionId);
  const newSession = await Session.create(createSession(user._id));

  return newSession;
};
