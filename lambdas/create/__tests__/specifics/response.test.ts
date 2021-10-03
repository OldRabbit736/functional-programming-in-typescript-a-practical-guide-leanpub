import { badRequestResponse, okResponse } from "../../src/specifics/responses";

describe("responses test", () => {
  it("should return a 200 response for ok response", () => {
    const result = okResponse("OK");

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe("OK");
  });

  it("should return a 400 response for bad request response", () => {
    const result = badRequestResponse("Error");

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe("Error");
  });
});
