import express from "express";
//import { getAllTrips, postTrip } from "../controllers/trip-controller.js";
import Trip from "../models/trip.js";

const router = express.Router();

router.get("/trips", async (req, res) => {
  const trips = await Trip.find();
  res.send(trips);
});

//router.get("/trips", getAllTrips);

//router.post("/trips", postTrip);

export default router;
