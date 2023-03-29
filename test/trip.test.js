process.env.NODE_ENV = "test"; // this is the environment variable that tells mongoose to use the test database
import chai from "chai";
// const chai = require("chai");
const expect = chai.expect;

describe("/First Test Collection", () => {
  it("should test 2 values", () => {
    expect(2).to.be.equal(2);
  });
});
