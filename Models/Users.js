const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ChatbotUserSchema = new Schema({
  Name: String,
  Phone: String,
}, { timestamps: true }
);

module.exports = mongoose.model("Chatbot", ChatbotUserSchema);