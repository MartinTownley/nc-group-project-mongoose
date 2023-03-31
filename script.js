import { config } from "dotenv-flow";
config();

import { createClient } from "@google/maps";

import { Configuration, OpenAIApi } from "openai";

const gmaps = createClient({
  key: process.env.API_KEY_MAPS,
  Promise: Promise,
});
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const generateLocations = async (inputString) => {
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: inputString }],
  });
  const contentFull = result.data.choices[0].message.content;
  const contentFullParsed = JSON.parse(contentFull);
  const locations = Array.isArray(contentFullParsed)
    ? contentFullParsed
    : contentFullParsed.locations;
  const geocodedLocations = await Promise.all(
    locations.map(async (location) => {
      const response = await gmaps
        .geocode({ address: location.address })
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

export default generateLocations;
