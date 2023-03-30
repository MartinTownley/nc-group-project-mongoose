import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TripSchema = new Schema({
  title: { type: String, required: false },
  author: { type: String, required: false },
  startLocation: { type: String, required: false },
  stops: [
    {
      city: { type: String, required: false },
      arrivalDate: { type: Date, required: false },
      departureDate: { type: Date, required: false },
      activities: [
        {
          name: String,
          address: String,
          coordinates: {
            lat: {
              type: Number,
            },
            lng: {
              type: Number,
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
  updatedAt: Date,
});

TripSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Trip = model("tripModel", TripSchema);
export default Trip;
