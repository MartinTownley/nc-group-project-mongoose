process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import server from "../server.js";
import mongoose from "mongoose";
import tripsData from "./data/test-data/trips.js";
chai.use(chaiHttp);
import Trip from "../../models/trip.js";

beforeEach(async () => {
  await mongoose.connection.dropDatabase();

  await Trip.create(tripsData.tripsData);
});

after(async () => {
  await mongoose.connection.close();
});

describe("Create a Trip", () => {
  it.only("Creates a new Trip", (done) => {
    const newTrip = new Trip({
      title: "Trip to the Moon",
      author: "Shriyam",
      startLocation: "Earth",
      stops: ["Mars", "Moon"],
    });
    newTrip.save().then(() => {
      assert(!newTrip.isNew);
      done();
    });
  });
});
