import {
  CreateReservationRequest,
  LambdaEvent,
} from "../../../util/domain/types";

import * as E from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";

const toCreateReservationRequest = (
  event: LambdaEvent
): CreateReservationRequest => {
  const parsedBody: any = JSON.parse(event.body);

  return {
    hotelId: parsedBody.hotelId,
    userId: parsedBody.userId,
    start: new Date(Date.parse(parsedBody.start)),
    end: new Date(Date.parse(parsedBody.end)),
    timestamp: parsedBody.timestamp,
  };
};

const checkCreateRequest = (createRequest: CreateReservationRequest) =>
  createRequest.end > createRequest.start
    ? E.right(createRequest)
    : E.left("Start date should be before end date");

export const fromEventToCreateRequest = flow(
  toCreateReservationRequest,
  checkCreateRequest
);
