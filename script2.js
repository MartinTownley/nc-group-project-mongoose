import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config();

import { createClient } from "@google/maps";

const gmaps = createClient({
  key: process.env.API_KEY_MAPS,
  Promise: Promise,
});

const geoCodeLocations = async (locations) => {
  const geocodedLocations = await Promise.all(
    locations.map(async (location) => {
      const response = await gmaps
        .geocode({
          address: location.address ? location.address : location.city,
        })
        .asPromise();
      if (response.status === 200) {
        location.coordinates = response.json.results[0].geometry.location;
      } else {
        console.log(response.error_message);
      }
      return location;
    })
  );
  return geocodedLocations;
};
export default geoCodeLocations;
