process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import chaiHttp from "chai-http";
import app from "../routes/trip-routes.js";
import server from "../index.js";
import mongoose from "mongoose";
import Trip from "../models/trip.js";
chai.use(chaiHttp);

import tripsData from "./data/test-data/trips.js";
describe("TESTS", function()  {
  this.timeout(55000);
  before((done) => {
    server
    .connect()
    .then(() => done())
    .catch(() => done(err));
  });
  
  after((done) => {
    if (server && server.listening) {
      server.close((err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    } else {
      done();
    }
  });
  
  beforeEach((done) => {
    mongoose.connection
    .dropCollection("trips")
    .then(() => {
      mongoose.connection.createCollection("trips");
      Trip.insertMany(tripsData.tripsData);
      })
      .then(() => done())
      .catch((err) => done(err));
    });

    it.only("POST:/api/trips - verify that when we post a trip it is successfully stored in the database", function(done) {
      const trip = { 
      title: "trip2",
      author: "martin",
      city: "london",
      coordinates: {
        lat: 51.5072,
        lng: -0.1276
      },
      preferences: ["nightlife", "food"],
      destination: {
        city: "manchester",
        coordinates: {
          lat: 53.4808,
          lng: -2.2426
        },
        arrivalDate: "2023-04-04",
        departureDate: "2023-04-08",
        activities: [
          {
            name: "The Warehouse Project",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253
            },
          },
          {
            name: "Hidden at Downtex Mill",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253
            },
          },
        ],
      },
    };
    chai
      .request(app)
      .post("/api/trips")
      .send(trip)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        done();
      });
  });

  it.only("POST:/api/trips - verify that when we post a trip with a title that is already in the database, returns an error", (done) => {
    const trip = { 
      title: "trip3",
      author: "martin",
      city: "london",
      coordinates: {
        lat: 51.5072,
        lng: -0.1276
      },
      preferences: ["nightlife", "food"],
      destination: {
        city: "manchester",
        coordinates: {
          lat: 53.4808,
          lng: -2.2426
        },
        arrivalDate: "2023-04-04",
        departureDate: "2023-04-08",
        activities: [
          {
            name: "The Warehouse Project",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253
            },
          },
          {
            name: "Hidden at Downtex Mill",
            address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
            coordinates: {
              lat: 53.4756,
              lng: -2.2253
            },
          },
        ],
      },
    };
    chai
      .request(app)
      .post("/api/trips")
      .send(trip)
      .end((err, res) => {
        console.log(res.text, "<<< res");
        res.should.have.status(400);
        done();
      });
  });

  it.only("GET:/api/trips - verify that we have 2 trips in the DB by default", (done) => {
    chai
      .request(app)
      .get("/api/trips")
      .end((err, res) => {
        const  trips  = JSON.parse(res.text).trips;
        console.log(trips, "<< trips")
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

    chai
      .request(app)
      .post("/api/trips/trip1")
      .send(preferences)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        done();
      });
  });
});
