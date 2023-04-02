import express from "express";
import {
  getAllTrips,
  postTrip,
  postPreferences,
  makeActivities,
  geoCodeActivitiesController,
  //   geoCodeStopsController,
} from "../controllers/trip-controller.js";

const router = express.Router();

router.get("/", getAllTrips);

router.post("/", postTrip);

router.post("/:trip_title", postPreferences);

router.get("/:trip_title/makePreferences", makeActivities);

router.get("/geoCodeActivities", geoCodeActivitiesController);
// router.get("/geoCodeStops", geoCodeStopsController);

export default router;
