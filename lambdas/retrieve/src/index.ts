import {
  badRequestResponse,
  okResponse,
} from "./../../../util/common/responses";

import { pipe } from "fp-ts/lib/function";
import { LambdaEvent } from "./../../../util/domain/types";
import { fromEventToRetrieveRequest } from "./specifics/anticorruption";

import * as T from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import { retrieve } from "./specifics/database";

export const handler = (event: LambdaEvent) => {
  return pipe(
    fromEventToRetrieveRequest(event),
    TE.fromEither,
    TE.chain((r) => retrieve(r)),
    TE.bimap(badRequestResponse, (r) => okResponse(JSON.stringify(r))),
    TE.getOrElse(T.of)
  )();
};
