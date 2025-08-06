import { Contact } from '../db/models/contacts.js';

export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactId = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
