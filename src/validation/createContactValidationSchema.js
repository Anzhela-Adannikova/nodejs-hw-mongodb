import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  phoneNumber: Joi.string().min(8).max(20).required(),

  email: Joi.string().email().min(6),

  isFavourite: Joi.bool(),

  contactType: Joi.string().valid('work', 'home', 'personal').required(),

  userId: Joi.string().custom((value, helper) => {
    const isValidId = isValidObjectId(value);

    if (!isValidId) {
      return helper.message('Not valid objectId');
    }

    return value;
  }),
});
