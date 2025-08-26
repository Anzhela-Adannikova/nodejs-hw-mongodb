import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(8).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),

  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),

  parentId: Joi.string().custom((value, helper) => {
    const isValidId = isValidObjectId(value);

    if (!isValidId) {
      return helper.message('Not valid objectId');
    }

    return value;
  }),
});
