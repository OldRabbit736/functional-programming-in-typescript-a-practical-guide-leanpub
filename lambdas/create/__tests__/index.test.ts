import { handler } from "../src";

describe("create index test", () => {
  it("should return a 400 with message if start is later than end", async () => {
    const now = new Date();
    const oneHourInFuture = new Date(now.getTime() + 60 * 60 * 1000);

    const eventData = {
      hotelId: "1",
      userId: "11",
      start: oneHourInFuture,
      end: now,
      timestamp: now,
    };
    const event = {
      body: JSON.stringify(eventData),
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe("Start date should be before end date");
  });

  it("should return 200 if everything is ok", async () => {
    const now = new Date();
    const oneHourInFuture = new Date(now.getTime() + 60 * 60 * 1000);

    const eventData = {
      hotelId: "1",
      userId: "11",
      start: now,
      end: oneHourInFuture,
      timestamp: now,
    };
    const event = {
      body: JSON.stringify(eventData),
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe("Reservation created");
  });
});
