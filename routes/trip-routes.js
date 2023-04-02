import express from "express";
import { getAllTrips, postTrip, postPreferences, makeActivities } from "../controllers/trip-controller.js";

const router = express.Router();

router.get("/", getAllTrips);

router.post("/", postTrip);

router.post("/:trip_title", postPreferences)

router.get("/:trip_title/makePreferences", makeActivities)

export default router;
