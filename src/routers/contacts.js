import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', getContactsController);

contactsRouter.get('/contacts/:contactId', getContactIdController);

contactsRouter.post('/contacts', createContactController);

contactsRouter.patch('contacts/:contactId', updateContactController);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;
