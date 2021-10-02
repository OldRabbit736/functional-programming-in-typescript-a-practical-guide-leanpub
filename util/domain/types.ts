// REST
export type LambdaEvent = {
  body: string;
};

// DOMAIN
export type CreateReservationRequest = {
  hotelId: string;
  userId: string;
  start: Date;
  end: Date;
  timestamp: Date;
};
