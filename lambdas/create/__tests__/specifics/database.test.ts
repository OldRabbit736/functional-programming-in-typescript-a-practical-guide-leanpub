import { CreateReservationPricedRequest } from "../../../../util/domain/types";
import { addId, saveToDatabase } from "../../src/specifics/database";

describe("id geneeration", () => {
  it("should generate a primary key and sort key", () => {
    const startDate = new Date(2020, 11, 10, 12, 0, 0);
    const dayLater = new Date(2020, 11, 11, 12, 0, 0);

    const exampleRequest: CreateReservationPricedRequest = {
      hotelId: "1",
      userId: "10",
      start: startDate,
      end: dayLater,
      price: 20,
      timestamp: startDate,
    };

    const result = addId(exampleRequest);

    expect(result.hotelId).toBe("1");
    expect(result.hashKey).toBe("RESERVATION#1");
    expect(result.rangeKey).toBe("2020-11-10#10");
  });
});

describe("save", () => {
  it("should save and then return an enriched event", async () => {
    const startDate = new Date(2020, 11, 10, 12, 0, 0);
    const dayLater = new Date(2020, 11, 11, 12, 0, 0);

    const exampleRequest: CreateReservationPricedRequest = {
      hotelId: "1",
      userId: "10",
      start: startDate,
      end: dayLater,
      price: 20,
      timestamp: startDate,
    };

    const result = await saveToDatabase(exampleRequest)();

    expect(result.hotelId).toBe("1");
    expect(result.hashKey).toBe("RESERVATION#1");
    expect(result.rangeKey).toBe("2020-11-10#10");
  });
});
