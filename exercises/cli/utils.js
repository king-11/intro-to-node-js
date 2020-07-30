const fs = require("fs");
const path = require("path");

// this path needs to be relative to work with fs
const contactsLocation = "contacts.json";

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = () => {
  const file = fs.readFileSync(path.join(__dirname, contactsLocation));
  const contacts = JSON.parse(file.toString());
  return contacts || null;
};

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {
  try {
    fs.writeFileSync(path.join(__dirname, contactsLocation), JSON.stringify(contacts, null, 2));
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  contactsLocation,
  getContacts,
  saveContacts,
};