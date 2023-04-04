import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TripSchema = new Schema({
  title: { type: String },
  author: { type: String },
  city: { type: String },
  coordinates: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  preferences: [{ type: String }],
  destination: {
    city: { type: String },
    coordinates: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    arrivalDate: { type: Date },
    departureDate: { type: Date },
    activities: [
      {
        name: String,
        address: String,
        coordinates: {
          latitude: {
            type: Number,
          },
          longitude: {
            type: Number,
          },
        },
      },
    ],
  },

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

const Trip = model("Trip", TripSchema);
export default Trip;
