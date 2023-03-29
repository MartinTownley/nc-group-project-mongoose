import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  title: { type: String, required: false },
  author: { type: String, required: false },
  startLocation: { type: String, required: false },
  // stops: [
  //   {
  //     city: { type: String, required: false },
  //     arrivalDate: { type: Date, required: false },
  //     departureDate: { type: Date, required: false },
  //     activities: [
  //       {
  //         name: String,
  //         address: String,
  //         coordinates: {
  //           lat: {
  //             $numberDouble: String,
  //           },
  //           lng: {
  //             $numberDouble: String,
  //           },
  //         },
  //       },
  //     ],
  //   },
  // ],
  // createdAt: {
  //   type: Date,
  //   default: () => Date.now(),
  //   immutable: true,
  // },
  // updatedAt: Date,
});

// tripSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Trip = model("Trip", tripSchema);
export default Trip;
