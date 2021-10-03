import * as cdk from "@aws-cdk/core";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as nodelambda from "@aws-cdk/aws-lambda-nodejs";

export class HotelReservationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const restApi = new apigw.RestApi(this, "Api", {
      endpointTypes: [apigw.EndpointType.REGIONAL],
    });

    const createReservationLambda = new nodelambda.NodejsFunction(
      this,
      "create-reservation",
      {
        entry: "lambdas/create/src/index.ts",
        handler: "handler",
        memorySize: 128,
        timeout: cdk.Duration.minutes(2),
      }
    );

    // POST reservations
    const reservationsResource = restApi.root.addResource("reservations");
    const createReservationIntegration = new apigw.LambdaIntegration(
      createReservationLambda
    );
    reservationsResource.addMethod("POST", createReservationIntegration);

    const getReservationLambda = new nodelambda.NodejsFunction(
      this,
      "get-reservation",
      {
        entry: "lambdas/retrieve/src/index.ts",
        handler: "handler",
        memorySize: 128,
        timeout: cdk.Duration.minutes(2),
      }
    );

    // GET reservations
    const getReservationIntegration = new apigw.LambdaIntegration(
      getReservationLambda
    );
    reservationsResource.addMethod("GET", getReservationIntegration);
  }
}
