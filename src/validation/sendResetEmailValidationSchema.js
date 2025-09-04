import Joi from 'joi';

export const sendResetEmailValidationSchema = Joi.object({
  email: Joi.string().required().email(),
});
