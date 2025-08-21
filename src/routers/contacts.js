import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactValidationSchema } from '../validation/createContactValidationSchema.js';
import { updateContactValidationSchema } from '../validation/updateContactValidationSchema.js';
import { isValidId } from '../middlewares/isValidId.js';
import { getContactValidationSchema } from '../validation/getContactValidationSchema.js';
import { validateQuery } from '../middlewares/validateQuery.js';

const contactsRouter = Router();

contactsRouter.use('/contacts/:contactId', isValidId('contactId'));

contactsRouter.get(
  '/contacts',
  validateQuery(getContactValidationSchema),
  getContactsController,
);

contactsRouter.get('/contacts/:contactId', getContactIdController);

contactsRouter.post(
  '/contacts',
  validateBody(createContactValidationSchema),
  createContactController,
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(updateContactValidationSchema),
  updateContactController,
);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;
