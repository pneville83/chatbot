const uuid = require("uuid");
const venom = require("venom-bot");
const dialogflow = require("../dialogflow");
const express = require("express");
const router = express.Router();

const sessionIds = new Map();

//MongoDB Models
const ChatbotUser = require("../Models/Users");
ChatbotUser.find({}, (err, users) => {
})

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    console.log(message)
    setSessionAndUser(message.from);
    let session = sessionIds.get(message.from);
    saveUserData(message);
    let payload = await dialogflow.sendToDialogFlow(message.body, session);
    let responses = payload.fulfillmentMessages;
    for (const response of responses) {
      await sendMessageToWhatsapp(client, message, response);
    }
  });
}

function saveUserData(message) {
  let user = new ChatbotUser({
    Phone: message.from,
    Name: message.notifyName,
});
user.save((err,res)=>{
   if(err) console.log(err)
   console.log(res)
 });
}

function sendMessageToWhatsapp(client, message, response) {
  return new Promise((resolve, reject) => {
    client
      .sendText(message.from, response.text.text[0])
      .then((result) => {
        console.log("Result: ", result); //return object success
        resolve(result);
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro);
        reject(erro);
      });
  });
}

async function setSessionAndUser(senderId) {
  try {
    if (!sessionIds.has(senderId)) {
      sessionIds.set(senderId, uuid.v1());
    }
  } catch (error) {
    throw error;
  }
}

module.exports = router;