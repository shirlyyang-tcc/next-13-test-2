export const onRequest = (context) => {
  return new Response("Context from node-functions!" + JSON.stringify(context));
};
