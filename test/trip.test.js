process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import server from "../server.js";

import mongoose from "mongoose";

chai.use(chaiHttp);

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});
after(async () => {
  await mongoose.connection.close();
});

describe("TESTS", () => {
  it("should verify that we have 0 trips in the DB", (done) => {
    chai
      .request(server)
      .get("/api/trips")
      .end((err, res) => {
        console.log(res.body, "<< res.body");
        const { trips } = res.body;
        res.should.have.status(200);
        trips.should.be.a("array");
        trips.length.should.be.equal(0);
        done();
      });
  });

  it("should verify that when we post a trip it is successfully stored in the database", (done) => {
    let trip = {
      title: "trip1",
      author: "fergus",
      startLocation: "nottingham",
    };

    chai
      .request(server)
      .post("/api/trips")
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        console.log(err);
        done();
      });
  });
});
