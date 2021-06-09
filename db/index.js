const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const getAllConversationMessages = async () => {
  let conversationMessages = fs.readFileSync(
    path.resolve(__dirname, "./messages.json")
  );
  conversationMessages = JSON.parse(conversationMessages);
  return conversationMessages;
};

const getMessagesFromConversation = async (id) => {
  let conversationMessages = await getAllConversationMessages();
  return conversationMessages[id] || [];
};

const addNewMessage = async (msg) => {
  let conversationMessages = await getAllConversationMessages();
  conversationMessages[msg.room] = conversationMessages[msg.room] || [];
  let id = uuidv4();
  conversationMessages[msg.room].push({ ...msg, id });
  fs.writeFileSync(
    path.resolve(__dirname, "./messages.json"),
    JSON.stringify(conversationMessages, null, 2)
  );
  return id;
};

module.exports = {
  getMessagesFromConversation,
  addNewMessage,
};
