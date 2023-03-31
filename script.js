// import { config } from "dotenv-flow";
// config();

// import { createClient } from "@google/maps";

// import { Configuration, OpenAIApi } from "openai";

// const gmaps = createClient({
//   key: process.env.API_KEY_MAPS,
//   Promise: Promise,
// });
// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.API_KEY,
//   })
// );

// const stringInput =
//   "Give me a list of locations that I can visit over 5 days in Manchester, for 3 people that are interested in nightclubs and dinner. The output should be a JSON object, with the form of an array of javascript objects. Each location should have a name and address property.";

// openai
//   .createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: stringInput }],
//   })
//   .then((result) => {
//     // console.log(result, "middlestep");
//     const contentFull = result.data.choices[0].message.content;
//     // console.log(contentFull, "<< contentFull");
//     /// we have a full JSON object, need to parse

//     //parse
//     const contentFullParsed = JSON.parse(contentFull);
//     // console.log(contentFullParsed, "<< contentFullParsed");
//     //parsed, now JS object, need to drill down to find array

//     //find array

//     return contentFullParsed;
//   })
//   .then((result) => {
//     // console.log(Array.isArray(result));
//     if (Array.isArray(result)) {
//       return result;
//     } else {
//       return result.locations;
//     }
//     // const locationsArray = contentFullParsed.locations;
//     // console.log(locationsArray, "<< locationsArray");
//   })
//   .then((locations) => {
//     const promise = Promise.all(
//       locations.map(async (location) => {
//         const response = await gmaps
//           .geocode({ address: location.address })
//           .asPromise();
//         if (response.status === 200) {
//           location.coordinates = response.json.results[0].geometry.location;
//         } else {
//           console.log(response.error_message);
//         }
//         return location;
//       })
//       )
//       promise.then((results) => {
//         console.log(results, "<< Finished array")
//       });
//   })

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
