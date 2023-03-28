import mongoose from "mongoose";
const { Schema, model } = mongoose;

const holidaySchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  startLocation: { type: String, required: true },
  stops: [
    {
      city: { type: String, required: true },
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
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: Date
});

holidaySchema.pre("save", function (next) {
    console.log("ur in")
  this.updatedAt = Date.now();
  next();
});

const Holiday = model("Holiday", holidaySchema);
export default Holiday;
