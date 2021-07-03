const app = require("express")();
const mongoose = require("mongoose");

const DB =
  "mongodb+srv://alokkumar:Alok2001@cluster0.zc1of.mongodb.net/tigrisdb?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log(err);
  });
