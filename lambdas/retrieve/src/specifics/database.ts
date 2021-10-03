import { string } from "fp-ts";
import * as TE from "fp-ts/lib/TaskEither";
import {
  Reservation,
  RetrieveReservationRequest,
} from "../../../../util/domain/types";

const hardCode = {
  hotelId: "1",
  userId: "11",
  start: new Date(),
  end: new Date(),
  timestamp: new Date(),
  price: 20,
};

const db = (request: RetrieveReservationRequest) => {
  return request.hotelId === "1" && request.userId === "11"
    ? hardCode
    : undefined;
};

export const retrieve = (
  request: RetrieveReservationRequest
): TE.TaskEither<string, Reservation> => {
  return TE.tryCatch(() => {
    return new Promise((resolve, reject) => {
      const result = db(request);

      if (result) {
        return resolve(result);
      }
      return reject("Unknown reservation");
    });
  }, String);
};
