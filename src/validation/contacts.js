import Joi from 'joi';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  phoneNumber: Joi.number().min(3).max(20),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),

  isFavourite: Joi.boolean(),

  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

// const validateBody = createContactSchema.validate(userData, {
//   abotrEarly: false,
// });

// 1 Створіть функцію validateBody, яка буде приймати аргументом
// схему валідації, а повертати буде middleware для валідації body запиту.
// 2 Додайте валідацію до роутів POST /contacts та PATCH /contacts/:contactId.
// Побудуйте схеми валідації, базуючись на тому, як ви описали
// властивості моделі MongoDB. Окрім цього, для полів типу string
// додайте правила мінімальної довжини - 3 символи,
// та максимальної довжини - 20 символів.
// 3 Додайте middleware isValidId для перевірки валідності id і
// застосуйте його в усіх роутах, які працюють з id.
