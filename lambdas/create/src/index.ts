import { calculatePrice } from "./specifics/priceCalculation";
import { pipe } from "fp-ts/lib/function";
import { LambdaEvent } from "./../../../util/domain/types";
import { fromEventToCreateRequest } from "./specifics/anticorruption";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { saveToDatabase } from "./specifics/database";
import { badRequestResponse, okResponse } from "./specifics/responses";

export const handler = async (event: LambdaEvent) => {
  return pipe(
    fromEventToCreateRequest(event),
    E.map(calculatePrice),
    TE.fromEither,
    TE.chain((r) => TE.rightTask(saveToDatabase(r))),
    // TE.map((_) => okResponse("Reservation created")),
    // TE.getOrElse((err) => () => Promise.resolve(badRequestResponse(err)))
    TE.bimap(badRequestResponse, (_) => okResponse("Reservation created")),
    TE.getOrElse(T.of)
  )();
};
