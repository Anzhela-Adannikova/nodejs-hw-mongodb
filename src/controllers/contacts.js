import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getContactId,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
    filter: filters,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',

    data: contactsData,
  });
};

export const getContactIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactId(contactId, userId);

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
  const photo = req.file;

  let photoUrl;
  console.log('req.file:', req.file);

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const userId = req.user._id;

  const contact = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });

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
  const userId = req.user._id;
  await deleteContactById(contactId, userId);

  res.status(204).send();
};
