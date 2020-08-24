require("dotenv").config();  // allows our project read variables from .env files
const express = require("express");
const path = require("path");

// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const sesClient = require("./ses-client");

const accountSid = 'ACcebf0b673c0a53e0b5d163ff430fb496';
const authToken = 'd8d73973527e49738b71c54157677019';
const client = require('twilio')(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);

app.get('/', (req, res) => {
    // call sesClient to send an email
    sesClient.sendEmail('sigbenuoghenero@gmail.com', "Hey! Welcome", "This is the body of email");
    
    res.send('Email is sent!');
});

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+14052521920',
     to: '+234808249494'
   })
  .then(message => console.log(message.sid));
module.exports =  app;