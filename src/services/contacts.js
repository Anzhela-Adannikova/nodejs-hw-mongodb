import createHttpError from 'http-errors';
import { Contact } from '../db/models/contacts.js';

const createPaginationMetadata = (page, perPage, itemCount) => {
  const totalPages = Math.ceil(itemCount / perPage);

  if (page > totalPages && totalPages !== 0) {
    throw createHttpError(
      400,
      `Invalid page count, max available page is ${totalPages}`,
    );
  }

  return {
    page,
    perPage,
    totalItems: itemCount,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages && page !== 1,
  };
};

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = perPage * (page - 1);
  const contactConditions = Contact.find();

  if (filter.contactType) {
    contactConditions.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactConditions.where('isFavourite').equals(filter.isFavourite);
  }

  const [contacts, contactsCount] = await Promise.all([
    Contact.find()
      .merge(contactConditions)
      .limit(perPage)
      .skip(skip)
      .sort({ [sortBy]: sortOrder }),
    Contact.find().countDocuments().merge(contactConditions),
  ]);

  return {
    contacts,
    ...createPaginationMetadata(page, perPage, contactsCount),
  };
};

export const getContactId = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

export const updateContact = async (contactId, payload) => {
  const contact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });

  return contact;
};

export const deleteContactById = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
