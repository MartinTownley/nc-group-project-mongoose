import Trip from "../models/trip.js";

export const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    if (!trips) {
      return res.status(404).json({ message: "Could not find trips." });
    }
    return res.status(200).json({ trips });
  } catch (err) {
    console.log(err);
  }
};

export const postTrip = async (req, res, next) => {
  const { title, author, startLocation, stops } = req.body;

  console.log(author, "<<<stops")
  const trip = new Trip({
    title,
    author,
    startLocation,
    stops
  });
  try {
    await trip.save();
    return res.status(201).json(trip);
  } catch (err) {
    console.log(err);
  }
};
