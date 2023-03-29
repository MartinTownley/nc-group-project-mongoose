import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config();
import router from "./routes/trip-routes.js";
import express from "express";
import mongoose from "mongoose";


const app = express();

app.get("/api/welcome", (req,res) => {
  res.status(200).send({message: "welcome to the TraveleRouter-rest-API"})
})

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

  export default app;