import generateLocations from "./script.js";

export const makeQueryString = async (city, preferences) => {
  let preferencesString = "";
  let preferencesCounter = 0;

  let inputString = `Give me a list of 3 locations that I can visit in ${city}, I am interested in;`;

  preferences.forEach((preference) => {
    preferencesCounter++;
    if (preferencesCounter !== preferences.length) {
      preferencesString = preferencesString + `${preference}, `;
    } else {
      preferencesString = preferencesString + `${preference}.`;
    }
    console.log(preferencesCounter, "<<preferences Counter");
    console.log(preferences.length, "preferences.length");
  });

  let specificationString =
    "The output should be a JSON object only, with the form of an array of javascript objects. Each location must contain only a name and address property.";

  const finalString =
    inputString + " " + preferencesString + " " + specificationString;

  console.log(finalString);

  //   const locations = await generateLocations(finalString);
  //   console.log(locations, "<< Finished array");

  return await generateLocations(finalString);
};
