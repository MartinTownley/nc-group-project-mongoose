process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import server from "../server.js";
import mongoose from "mongoose";
import tripsData from "./data/test-data/trips.js";
import Trip from "../models/trip.js";
chai.use(chaiHttp);

beforeEach(async () => {
  await mongoose.connection.dropDatabase();

  await Trip.create(tripsData.tripsData);
});

after(async () => {
  await mongoose.connection.close();
});

describe("TESTS", () => {
  it.only("POST:/api/trips - verify that when we post a trip it is successfully stored in the database", (done) => {
    const trip = {
      title: "trip3",
      author: "martin",
      startLocation: "london",
      stops: {
        city: "manchester",
        arrivalDate: "2023-04-04",
        departureDate: "2023-04-08",
        activities: [
          {
            name: "The Warehouse Project",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253,
            },
          },
          {
            name: "Hidden at Downtex Mill",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253,
            },
          },
        ],
      },
    }
    chai
      .request(server)
      .post("/api/trips")
      .send(trip)
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(201);
        done();
      });
  });

  it("POST:/api/trips - verify that when we post a trip with a title that is already in the database, returns an error", (done) => {
    const trip = {
      title: "trip2",
      author: "martin",
      startLocation: "london",
      stops: {
        city: "manchester",
        arrivalDate: "2023-04-04",
        departureDate: "2023-04-08",
        activities: [
          {
            name: "The Warehouse Project",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253,
            },
          },
          {
            name: "Hidden at Downtex Mill",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253,
            },
          },
        ],
      },
    }
    chai
      .request(server)
      .post("/api/trips")
      .send(trip)
      .end((err, res) => {
        console.log(res.text, "<<< res")
        res.should.have.status(400);
        done();
      });
  });

  
  it("GET:/api/trips - verify that we have 2 trips in the DB by default", (done) => {
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

  // it("GET:/api/trips/trip_id", (done) => {
  //   chai
  //   .request(server)
  //   .get("/api/trips/")
  // })

  it("POST :/api/trips/:trip_title/preferences - verify that a set of preferences input by the user can be added to the trips object", (done) => {
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
