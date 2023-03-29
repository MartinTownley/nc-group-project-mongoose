process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import Trip from "../models/trip.js";
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import server from "../server.js";
import { getAllTrips, postTrip } from "../controllers/trip-controller.js";

chai.use(chaiHttp);

beforeEach((done) => {
  Trip.deleteMany({});
  done();
});

afterEach((done) => {
  Trip.deleteMany({});
  done();
});

describe("First test collection", () => {
  it("test default API welcome route", (done) => {
    chai
      .request(server)
      .get("/api/welcome")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const actualVal = res.body.message;
        expect(actualVal).to.be.equal("welcome to the TraveleRouter-rest-API");
        done();
      });
  });

  it("should verify that we have 0 trips in the DB", (done) => {
    chai
      .request(server)
      .get("/api/trips")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.a("array");
        res.body.length.should.be.equal(0);
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

describe("/First Test Collection", () => {
  it("should test 2 values", () => {
    expect(2).to.be.equal(2);
  });
});
