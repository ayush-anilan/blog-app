const request = require("jest");
const app = require("../server");

describe("Get all posts", () => {
  it("Should get all posts", async () => {
    await request(app)
      .get("/posts")
      .set("Accept", "application/json")
      .except("Content-Type", /json/)
      .except(200);
  });
});
