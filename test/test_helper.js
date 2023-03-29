//const mongoose = require("mongoose");

import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb://mongodb0.example.com:27017";
mongoose.connect(MONGODB_URI);

mongoose.connection
  // on and once are event handlers. take the events as the first argument and a function as the second, which executes once the event occurs.
  .once("open", () => console.log("Good to go!"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

// beforeEach((done) => {
//   mongoose.connection.collections.users.drop(() => {
//     // Ready to run the next test!
//     done();
//   });
// });
