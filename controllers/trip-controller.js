import Trip from "../models/trip.js";
import { makeQueryString } from "../inputString.js";
import geoCodeLocations from "../script2.js";
import  ObjectId  from "mongodb";

export const getAllTrips = async (req, res, next) => {
  try {
    let trips = await Trip.find();

    console.log(trips, "trips inside controller");
    if (!trips) {
      return res.status(404).json({ message: "Could not find trips." });
    }
    return res.status(200).json({ trips });
  } catch (err) {
    console.log(err);
  }
};

export const getTripById = async (req, res, next) => {
  const { trip_id } = req.params;
 
  try {
    let trips = await Trip.findOne({ _id: trip_id });

    console.log(trips, "trips inside controller");
    if (!trips) {
      return res.status(404).json({ message: "Could not find trips." });
    }
    return res.status(200).json({ trips });
  } catch (err) {
    console.log(err);
  }
};

export const postTrip = async (req, res, next) => {
  const {
    title,
    author,
    city,
    coordinates,
    preferences,
    destination,
    // activities,
  } = req.body.params;
  console.log(
    title,
    req.body,
    "<<body",
    req.body.params,
    "<<params"
    // activities,
    // "activities"
  );
  let existingTrip;
  try {
    existingTrip = await Trip.findOne({ title: title });
    console.log(existingTrip, existingTrip.title, "existingTrip in BE");
  } catch (err) {
    console.log(err);
  }
  // if (!existingTrip.title) {
  const trip = new Trip({
    title,
    author,
    city,
    coordinates,
    preferences,
    destination,
    // activities,
  });
  try {
    await trip.save();
    return res.status(201).json(trip);
  } catch (err) {
    console.log(err);
  }
  // } else {
  //   return res.status(400).json({
  //     message: "trip already exists under that title! please pick another",
  //   });
  // }
};

// export const postTrip = async (req, res, next) => {
//   const trip = req.body;
//   console.log(trip.title, "first title");

//   Trip.findOne({ title: trip.title })
//     .then((existingTrip) => {
//       console.log(existingTrip, "resolution of promise");
//       if (existingTrip) {
//         return res.status(400).json({
//           message: "trip already exists under that title! please pick another",
//         });
//       }
//     })
//     .then(() => {
//       const newTrip = new Trip({
//         trip
//       });
//       newTrip.save();
//       return res.status(201).json(trip);
//     })
//     .then((trip) => {
//       console.log(trip, "new trip");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const postPreferences = async (req, res, next) => {
  const preferences = req.body;
  const title = req.params.trip_title;

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

export const makeActivities = async (req, res, next) => {
  // const title = req.params.trip_title;

  console.log(req.query, "body");
  try {
    const { city, preferences } = req.query;
    // const trips = await Trip.findOne({title: title});
    // const city = trips.destination.city
    // const preferences = trips.preferences

    const activities = await makeQueryString(city, preferences);
    return res.status(200).json({ activities });
  } catch (err) {
    console.log(err);
  }
};

export const geoCodeActivitiesController = async (req, res, next) => {
  console.log(req.query, "qeuries");
  try {
    let locations;
    if (!Array.isArray(req.query)) {
      locations = Object.values(req.query);
    } else {
      locations = req.query;
    }
    const geoCodedLocations = await geoCodeLocations(locations);
    return res.status(200).json({ geoCodedLocations });
  } catch (err) {
    console.log(err);
  }
};
