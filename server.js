import * as dotenvFlow from "dotenv-flow";
import router from "./routes/trip-routes.js";
import express from "express";
import mongoose from "mongoose";

// load .env file config
dotenvFlow.config();
console.log(process.env, "<<process.env")
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "welcome to the TraveleRouter-rest-API" });
});

app.use("/api/trips", router); // use router for anything matching this path. Router only receives what's after trips

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
