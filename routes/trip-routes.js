import express from "express";
import { getAllTrips, postTrip } from "../controllers/trip-controller.js";

const router = express.Router();

router.get("/", getAllTrips);
router.post("/postTrip", postTrip);

export default router;
