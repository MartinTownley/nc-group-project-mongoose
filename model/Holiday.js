import mongoose from "mongoose";
const { Schema, model } = mongoose;

const holidaySchema = new Schema({
  title: String,
  author: String,
  startLocation: String,
  stops: [
    {
      city: String,
      places: [
        {
          name: String,
          address: String,
          coordinates: {
            lat: {
              $numberDouble: String,
            },
            lng: {
              $numberDouble: String,
            },
          },
        },
      ],
    },
  ],
});

const Holiday = model("Holiday", holidaySchema);
export default Holiday;
