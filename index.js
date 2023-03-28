import mongoose from "mongoose";
import Holiday from "./model/Holiday.js";

mongoose.connect(
  "mongodb+srv://fergusjames:ygzWeS7ssVeTyPYZ@travelerouter.ixdijru.mongodb.net/?retryWrites=true&w=majority"
);

// //Create a new trip object
// const trip = await Holiday.create({
//   title: "Trip to Manchester",
//   author: "Fergus",
//   startLocation: "Nottingham",
//   stops: [
//     {
//       city: "Manchester",
//       places: [
//         {
//           name: "The Refuge",
//           address: "Oxford St, Manchester M60 7HA, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4744196",
//             },
//             lng: {
//               $numberDouble: "-2.2408512",
//             },
//           },
//         },
//         {
//           name: "Impossible Manchester",
//           address: "36 Peter St, Manchester M2 5GP, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4780445",
//             },
//             lng: {
//               $numberDouble: "-2.248477",
//             },
//           },
//         },
//         {
//           name: "The Alchemist",
//           address: "1 New York St, Manchester M1 4HD, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4801988",
//             },
//             lng: {
//               $numberDouble: "-2.2398574",
//             },
//           },
//         },
//         {
//           name: "Albert's Schloss",
//           address: "27 Peter St, Manchester M2 5QR, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4782844",
//             },
//             lng: {
//               $numberDouble: "-2.2478254",
//             },
//           },
//         },
//         {
//           name: "The Milton Club",
//           address: "244 Deansgate, Manchester M3 4BQ, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4779428",
//             },
//             lng: {
//               $numberDouble: "-2.2499581",
//             },
//           },
//         },
//         {
//           name: "Cloud 23",
//           address:
//             "Beetham Tower, 303 Deansgate, Manchester M3 4LQ, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4752573",
//             },
//             lng: {
//               $numberDouble: "-2.250699",
//             },
//           },
//         },
//         {
//           name: "Menagerie Restaurant & Bar",
//           address: "1 New Bailey St, Manchester M3 5EX, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4817652",
//             },
//             lng: {
//               $numberDouble: "-2.2548198",
//             },
//           },
//         },
//         {
//           name: "Revolution Deansgate Locks",
//           address: "19-20 Whitworth St W, Manchester M1 5LH, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4741783",
//             },
//             lng: {
//               $numberDouble: "-2.2460601",
//             },
//           },
//         },
//         {
//           name: "San Carlo Cicchetti",
//           address:
//             "20, House of Fraser, King St W, Manchester M3 2GQ, United Kingdom",
//           coordinates: {
//             lat: {
//               $numberDouble: "53.4818756",
//             },
//             lng: {
//               $numberDouble: "-2.2478721",
//             },
//           },
//         },
//       ],
//     },
//   ],
// });


const trip = await Holiday.findById("6422eb6dafc6f2d395fe58b8", "title stops updatedAt").exec();

trip.title = "great trip to manchester";
await trip.save();

// const trip = await Holiday.deleteOne({title: "great trip to manchester"})

console.log(trip);
