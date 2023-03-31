import express from "express";
import { getAllTrips, postTrip, postPreferences } from "../controllers/trip-controller.js";

const router = express.Router();

router.get("/", getAllTrips);

router.post("/", postTrip);

router.post("/:trip_title", postPreferences)


export default router;
