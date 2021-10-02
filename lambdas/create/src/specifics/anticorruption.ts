import {
  CreateReservationRequest,
  LambdaEvent,
} from "../../../../util/domain/types";

import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { Ord } from "fp-ts/lib/Date";
import { lt } from "fp-ts/lib/Ord";
import { Json, JsonRecord, parse } from "fp-ts/lib/Json";

const getBody = (event: LambdaEvent) => event.body;

const toCreateReservationRequest = (body: Json): CreateReservationRequest => {
  const record = body as JsonRecord;

  return {
    hotelId: record.hotelId as string,
    userId: record.userId as string,
    start: new Date(Date.parse(record.start as string)),
    end: new Date(Date.parse(record.end as string)),
    timestamp: new Date(Date.parse(record.timestamp as string)),
  };
};

const checkCreateRequest = (createRequest: CreateReservationRequest) =>
  lt(Ord)(createRequest.start, createRequest.end)
    ? E.right(createRequest)
    : E.left("Start date should be before end date");

export const fromEventToCreateRequest = (
  e: LambdaEvent
): E.Either<string, CreateReservationRequest> =>
  pipe(
    getBody(e),
    parse,
    E.mapLeft((_) => "Could not parse body of request"),
    E.map(toCreateReservationRequest),
    E.chain(checkCreateRequest)
  );
