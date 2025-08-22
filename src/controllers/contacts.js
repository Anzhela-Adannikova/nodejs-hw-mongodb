import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getContactId,
  getContacts,
  updateContact,
} from '../services/contacts.js';

const buildContactFilter = (query) => ({
  contactType: query.contactType,
  isFavourite: query.isFavourite,
});

export const getContactsController = async (req, res) => {
  const filters = buildContactFilter(req.validatedQuery);
  filters.userId = req.user._id;

  const contactsData = await getContacts({
    page: req.validatedQuery.page,
    perPage: req.validatedQuery.perPage,
    sortBy: req.validatedQuery.sortBy,
    sortOrder: req.validatedQuery.sortOrder,
    filters,
    // filter: buildContactFilter(req.validatedQuery),
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',

    data: contactsData,
  });
};

export const getContactIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactId(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with ${contactId} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact({
    ...req.body,
    parentId: req.body.parentId ?? req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactById(contactId);

  res.status(204).send();
};
