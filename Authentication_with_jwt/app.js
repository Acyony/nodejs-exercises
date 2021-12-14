const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
require('dotenv').config();

const app = express();


app.use(express.urlencoded({extended: true}));

// Setting up mongoose to connect with th DB:
mongoose.connect(process.env.DB_CONNECTION);

mongoose.connection.on("connected", () => {
    console.log('Connection established! =^.^=');
});
mongoose.connection.on("error", () => {
    console.log('Connection not established!');
})

app.get('/', (req, res) => {
    res.json("API work done!  =^.^=");
})


app.use("/user", user)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Connected to port " + port)
})