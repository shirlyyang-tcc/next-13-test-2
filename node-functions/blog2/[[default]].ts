export const onRequest = (context) => {
  return new Response("Blog default!" + JSON.stringify(context.params));
};