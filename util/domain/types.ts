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

// DOMAIN
export type CreateReservationPricedRequest = {
  hotelId: string;
  userId: string;
  start: Date;
  end: Date;
  timestamp: Date;
  price: number;
};

export type CreateReservationPricedWithIdRequest = {
  hashKey: string;
  rangeKey: string;
  hotelId: string;
  userId: string;
  start: Date;
  end: Date;
  timestamp: Date;
  price: number;
};
