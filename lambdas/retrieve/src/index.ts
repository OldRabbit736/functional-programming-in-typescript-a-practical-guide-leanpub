import { pipe } from "fp-ts/lib/function";
import { LambdaEvent } from "./../../../util/domain/types";
import { fromEventToRetrieveRequest } from "./specifics/anticorruption";

import * as E from "fp-ts/lib/Either";
import * as T from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";

export const handler = async (event: LambdaEvent) => {
  return pipe(fromEventToRetrieveRequest(event), E.map());
};
