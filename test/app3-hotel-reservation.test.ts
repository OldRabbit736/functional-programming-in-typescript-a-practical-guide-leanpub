import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as App3HotelReservation from '../lib/app3-hotel-reservation-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new App3HotelReservation.App3HotelReservationStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
