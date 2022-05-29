const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async()=> {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  };
  
 const getContactById = async(contactId)=> {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result){
        return null;
    }
    return result;
  };
  
  const removeContact = async(contactId)=> {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const [removedContacts] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContacts;
  };
  
  const addContact = async(data)=> {
    const contacts = await listContacts();
    const newСontact = {id: nanoid(),...data};
    contacts.push(newСontact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newСontact;
  };

    module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact,
    };
    
