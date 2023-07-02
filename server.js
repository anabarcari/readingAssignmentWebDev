const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://yoda:starwars2023@cluster0.cm37uwc.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// MongoClient.connect(
//   "mongodb+srv://yoda:starwars2023@cluster0.cm37uwc.mongodb.net/?retryWrites=true&w=majority",
//   { useUnifiedTopology: true },
//   (err, client) => {
//     if (err) return console.error(err);
//     console.log("Connected to Database");
//   }
// );
app.set("views", "./src/views");
app.set("view engine", "ejs");
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const quoteRoute = require("./quotes");
app.use("/", quoteRoute);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })

app.listen(4000, function () {
  console.log("listening on 4000");
});
