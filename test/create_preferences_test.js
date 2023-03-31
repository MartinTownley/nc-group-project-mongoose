process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import server from "../server.js";
import mongoose from "mongoose";
chai.use(chaiHttp);
import Trip from "../models/trip.js";
import tripsData from "./data/test-data/trips.js"


beforeEach(async () => {
  await mongoose.connection.dropDatabase();

  await Trip.create(tripsData.tripsData);
});

after(async () => {
  await mongoose.connection.close();
});

describe("TESTS", () => {
  it.only("test that a set of preferences input by the user can be added to the trips object", (done) => {
    const preferences = ["music", "nightlife", "food"];

    chai.request(server)
    .post("/api/trips/trip1")
    .send(preferences)
    .end((err, res)=> {
        console.log(res.body)
        res.should.have.status(201);
        done()
    })
    ;
  });
});
