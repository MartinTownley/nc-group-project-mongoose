import express from "express";
import { getAllTrips, postTrip } from "../controllers/trip-controller.js";

const router = express.Router();

router.get("/trips", getAllTrips);
router.post("/trips", postTrip);

export default router;
