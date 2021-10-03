import {
  CreateReservationPricedRequest,
  CreateReservationPricedWithIdRequest,
} from "../../../../util/domain/types";

import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/function";

export const addId = (
  createRequest: CreateReservationPricedRequest
): CreateReservationPricedWithIdRequest => ({
  hashKey: `RESERVATION#${createRequest.hotelId}`,
  rangeKey: `${createRequest.start.getFullYear()}-${createRequest.start.getUTCMonth()}-${createRequest.start.getUTCDate()}#${
    createRequest.userId
  }`,
  ...createRequest,
});

const save = (
  createRequest: CreateReservationPricedWithIdRequest
): T.Task<void> => {
  console.log(`Received ${JSON.stringify(createRequest)}`);
  return () => Promise.resolve();
};

// passthrough function:
// something that executes a side effect and then returns what it
// received. It is also known as a tee function (like the unix command).
export const saveToDatabase = (
  createRequest: CreateReservationPricedRequest
): T.Task<CreateReservationPricedWithIdRequest> => {
  return pipe(T.of(createRequest), T.map(addId), T.chainFirst(save));
};
