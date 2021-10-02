import {
  CreateReservationPricedRequest,
  CreateReservationRequest,
} from "../../../../util/domain/types";

const differenceInDays = (start: Date, end: Date) => {
  return Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) / 86400000
  );
};

export const calculatePrice = (
  r: CreateReservationRequest
): CreateReservationPricedRequest => {
  const days = differenceInDays(r.start, r.end);

  return {
    ...r,
    price: days * 20,
  };
};
