export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ id: "some-id" }),
  };
};