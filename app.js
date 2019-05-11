const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
// import React from 'react';
// import ReactDOM from 'react-dom';

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Goodbye Cruel World"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));





// document.addEventListener("DOMContentLoaded", () => {

//     const canvas = document.getElementById("canvas");
//     ReactDOM.render(<h2>Whoops</h2>, canvas);
// });

