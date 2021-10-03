import { handler } from "../src";

describe("retrieve index test", () => {
  it("should return the asked-for reservation", async () => {
    const startDate = new Date(2020, 11, 10, 12, 0, 0);

    const queryStringParameters = {
      hotelId: "1",
      userId: "11",
      start: startDate.toISOString(),
    };
    const event = {
      queryStringParameters,
    };

    const result: any = await handler(event);

    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body);

    expect(body.price).toBe(20);
  });
});
