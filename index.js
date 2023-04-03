import * as dotenvFlow from "dotenv-flow";
import mongoose from "mongoose";

// load .env file config
dotenvFlow.config();

function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DBHOST, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}

function close() {
  return mongoose.disconnect;
}

export default {connect, close};
