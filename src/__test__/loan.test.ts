import request from "supertest";
import app from "../server";
import { StatusCodes } from "http-status-codes";

describe("POST /borrow", () => {
  it("should return response 201 if borrow success and 400 if books not exist", async () => {
    const response = await request(app)
      .post("/api/v1/loans/borrow")
      .send({ memberCode: "M001", bookCode: "TW-11" });

    expect(response.status).toBe(StatusCodes.CREATED);
  });
});

describe("POST /return", () => {
  it("should return response 200 if return success and 400 if books not booked", async () => {
    const response = await request(app)
      .post("/api/v1/loans/return")
      .send({ memberCode: "M001", bookCode: "TW-11" });

    expect(response.status).toBe(200);
  });
});
