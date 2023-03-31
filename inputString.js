import generateLocations from "./script.js";

const inputString = "Give me a list of locations that I can visit over 5 days in Manchester, for 3 people that are interested in nightclubs and dinner. The output should be a JSON object, with the form of an array of javascript objects. Each location should have a name and address property.";

const locations = await generateLocations(inputString);
console.log(locations, "<< Finished array");


