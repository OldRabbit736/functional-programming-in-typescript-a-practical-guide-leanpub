import { DynamoDB } from "aws-sdk";
import { PutItemInput } from "aws-sdk/clients/dynamodb";

const client = new DynamoDB.DocumentClient({ region: "ap-northeast-2" });

export const save = (params: PutItemInput) => {
  return client.put(params).promise();
};
