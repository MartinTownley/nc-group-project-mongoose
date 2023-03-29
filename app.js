//import * as dotenv from "dotenv";
import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config();
//dotenv.config();
import router from "./routes/trip-routes.js";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use("/api/trips", router);

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB: ", error))
  .then(() => app.listen(5000))
  .then(() => console.log("Server running on port 5000"))
  .catch((err) => console.log(err));
