import Trip from "../models/trip.js";

export const getAllTrips = async (req, res, next) => {
  let trips;
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
  //console.log(req.body, "<< req.body");

  const { body } = req;
  console.log(body, "<< req");

  //const { title, author, startLocation, stops } = req.body;

  const trip = new Trip({
    //   title,
    //   author,
    //   startLocation,
    //   stops,
  });

  try {
    await trip.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ trip });
};
