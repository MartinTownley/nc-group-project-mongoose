import express from "express";
import cors from "cors";

import {
  getAllTrips,
  postTrip,
  postPreferences,
  makeActivities,
  geoCodeActivitiesController,
} from "../controllers/trip-controller.js";

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

router.get("/", getAllTrips);

router.post("/", postTrip);

router.post("/:trip_title", postPreferences);

router.get("/:trip_title/makePreferences", makeActivities);

router.get("/geoCodeActivities", geoCodeActivitiesController);

app.use("/api/trips", router); // use router for anything matching this path. Router only receives what's after trips

export default app;
