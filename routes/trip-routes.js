import express from "express";
import {
  getAllTrips,
  postTrip,
  postPreferences,
  makeActivities,
  geoCodeController,
} from "../controllers/trip-controller.js";

const router = express.Router();

router.get("/", getAllTrips);

router.post("/", postTrip);

router.post("/:trip_title", postPreferences);

router.get("/:trip_title/makePreferences", makeActivities);

router.get("/geoCode", geoCodeController);

export default router;
