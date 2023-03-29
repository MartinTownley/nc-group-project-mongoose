import assert from "assert";

import Trip from "../../models/trip.js";

describe("Create a Trip", () => {
  it("Creates a new Trip", (done) => {
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
