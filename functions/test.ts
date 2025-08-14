export const onRequest = (context) => {
  console.log('context', context);
  return new Response("Test!" + JSON.stringify(context.request.eo.geo));
};
