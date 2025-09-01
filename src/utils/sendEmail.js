import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

dotenv.config();

const transport = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: getEnvVar(ENV_VARS.SMTP_PORT),
  secure: true,
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
  },
});

// await transport.verify();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transport.sendMail({
      subject,
      to,
      html,
      from: getEnvVar(ENV_VARS.SMTP_FROM),
    });
  } catch (err) {
    console.log(err);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
