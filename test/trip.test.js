process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import server from "../server.js";
import mongoose from "mongoose";
import tripsData from "./data/test-data/trips.js";
chai.use(chaiHttp);
import Trip from "../models/trip.js";

beforeEach(async () => {
  await mongoose.connection.dropDatabase();

  await Trip.create(tripsData.tripsData);
});

after(async () => {
  await mongoose.connection.close();
});

describe("TESTS", () => {
  it("should verify that when we post a trip it is successfully stored in the database", (done) => {
    chai
      .request(server)
      .post("/api/trips")
      .send(tripsData)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should verify that we have 2 trips in the DB", (done) => {
    chai
      .request(server)
      .get("/api/trips")
      .end((err, res) => {
        const { trips } = res.body;
        res.should.have.status(200);
        trips.should.be.a("array");
        trips.length.should.be.equal(2);
        done();
      });
  });
});
