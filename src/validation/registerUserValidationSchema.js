import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().required().email().min(6),
  password: Joi.string().required(),
});
