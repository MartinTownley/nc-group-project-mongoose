import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config();

import { Configuration, OpenAIApi } from "openai";

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
  // console.log(result.data.choices[0].message, "<<uneddited");
  // console.log(result.data.choices[0].message.content.replace(/`json|`/g,""), "<< fixed");
  const contentFull = result.data.choices[0].message.content.replace(/`json|`/g,"");
  const contentFullParsed = JSON.parse(contentFull);
  const locations = Array.isArray(contentFullParsed)
    ? contentFullParsed
    : contentFullParsed.locations;
  return locations;
};

export default generateLocations;
