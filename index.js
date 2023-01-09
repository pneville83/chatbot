const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());



mongoose.connect(
  "mongodb+srv://peternev:johnpeter83@chatbot.iv9fjrd.mongodb.net/?retryWrites=true&w=majority",
  (err, res) => {
    if (err) return console.log("Hubo un error en la base de datos ", err);
    console.log("BASE DE DATOS ONLINE");
  }
);

app.use("/chatbot", require("./Whatsapp/chatbot"));



app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});