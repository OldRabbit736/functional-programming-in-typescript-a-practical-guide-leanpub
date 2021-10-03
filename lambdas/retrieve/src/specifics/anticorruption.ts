import { guard } from "fp-ts-std/Function";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import {
  LambdaEvent,
  RetrieveReservationRequest,
} from "../../../../util/domain/types";

const toRetrieveRequest = (event: LambdaEvent): RetrieveReservationRequest => ({
  hotelId: event.queryStringParameters?.hotelId!,
  userId: event.queryStringParameters?.userId!,
  start: new Date(Date.parse(event.queryStringParameters?.start as string)),
});

const checkRetrieveRequest = (event: LambdaEvent) => {
  const queryParamGuard = guard([
    [
      (e: LambdaEvent) => !e.queryStringParameters,
      (_) => `Missing query string params`,
    ],
    [
      (e: LambdaEvent) => !e.queryStringParameters?.hotelId,
      (_) => `Missing hotel id`,
    ],
    [
      (e: LambdaEvent) => !e.queryStringParameters?.userId,
      (_) => `Missing user id`,
    ],
    [
      (e: LambdaEvent) => !e.queryStringParameters?.start,
      (_) => `Missing start`,
    ],
  ])((_) => "");

  const message = queryParamGuard(event);

  return message ? E.left(message) : E.right(event);
};

// const checkRetrieveRequest = (event: LambdaEvent) => {
//   return event.queryStringParameters?.hotelId &&
//     event.queryStringParameters.userId &&
//     event.queryStringParameters.start
//     ? E.right(event)
//     : E.left(
//         "One or more empty fields. hotelId, userId ans start are required."
//       );
// };

export const fromEventToRetrieveRequest = (
  event: LambdaEvent
): E.Either<string, RetrieveReservationRequest> => {
  return pipe(checkRetrieveRequest(event), E.map(toRetrieveRequest));
};
