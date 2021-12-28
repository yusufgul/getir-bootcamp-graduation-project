const request = require("supertest");
const { app } = require("../app");

describe("Test with the correct route", () => {
  test("Send corret data with post", (next) => {
    request(app)
      .post("/")
      .send({
        startDate: "2016-01-26",
        endDate: "2016-05-02",
        minCount: 500,
        maxCount: 1000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        next();
      });
  });
  test("Send missing data with post", (next) => {
    request(app)
      .post("/")
      .send({
        endDate: "2016-05-02",
        minCount: 500,
        maxCount: 1000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        next();
      });
  });
  test("Send corrupted data format", (next) => {
    request(app)
      .post("/")
      .send({
        fdgs: "asda",
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        next();
      });
  });
  test("Send wrong date format", (next) => {
    request(app)
      .post("/")
      .send({
        startDate: "2016-01-",
        endDate: "2016-05-02",
        minCount: 500,
        maxCount: 1000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        next();
      });
  });
});

describe("Test with different paths and operations", () => {
  test("Test with a non-existing path", (next) => {
    request(app)
      .post("/sasfa")
      .send({
        startDate: "2016-01-26",
        endDate: "2016-05-02",
        minCount: 500,
        maxCount: 1000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        next();
      });
  });
  test("Send GET request with the correct path", (next) => {
    request(app)
      .get("/")
      .send({
        startDate: "2016-01-26",
        endDate: "2016-05-02",
        minCount: 500,
        maxCount: 1000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        next();
      });
  });
});
