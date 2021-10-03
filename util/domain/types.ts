// REST
export type LambdaEvent = {
  queryStringParameters?: QueryStringParams;
  body?: string;
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

export type Response = {
  statusCode: number;
  body: string;
};

export type QueryStringParams = {
  hotelId?: string;
  userId?: string;
  start?: string;
};

export type RetrieveReservationRequest = {
  hotelId: string;
  userId: string;
  start: Date;
};

export type Reservation = {
  hotelId: string;
  userId: string;
  start: Date;
  end: Date;
  timestamp: Date;
  price: number;
};
