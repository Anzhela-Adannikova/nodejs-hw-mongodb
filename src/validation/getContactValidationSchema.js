import Joi from 'joi';

export const getContactValidationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  perPage: Joi.number().min(1).max(100).default(10),
  sortBy: Joi.string().valid('_id', 'name').default('_id'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
});
