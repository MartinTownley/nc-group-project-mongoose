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
  const { title, author, startLocation, destination } = req.body;

  let existingTrip;
  try {
    existingTrip = await Trip.findOne({ title });
  } catch (err) {
    console.log(err);
  }
  if (existingTrip) {
    return res
      .status(400)
      .json({
        message: "trip already exists under that title! please pick another",
      });
  }

  const trip = new Trip({
    title,
    author,
    startLocation,
    destination,
  });
  try {
    await trip.save();
    return res.status(201).json(trip);
  } catch (err) {
    console.log(err);
  }
};

export const postPreferences = async (req, res, next) => {
  const  preferences  = req.body;
  const  title  = req.params.trip_title;

  let existingTrip;
  try {
    existingTrip = await Trip.findOne({ title: title });
    existingTrip.preferences = preferences;
    await existingTrip.save();
    return res.status(201).json(preferences);
  } catch (err) {
    console.log(err);
  }
};
