import Trip from "../models/trip.js";

export const getAllTrips = async (req, res, next) => {
  try {
    trips = await Trip.find(); // find all trips
  } catch (err) {
    console.log(err);
  }
  if (!trips) {
    return res.status(404).json({ message: "Could not find trips." });
  }
  return res.status(200).json({ trips });
};

export const postTrip = async (req, res, next) => {
  console.log(body.req, "<< req");

  const { title, author, startLocation } = req.body;

  const trip = new Trip({
    title,
    author,
    startLocation,
  });

  try {
    await trip.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ trip });
};
