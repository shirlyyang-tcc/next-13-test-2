export const onRequest = (context) => {
  console.log("Context from node-functions!", context);
  const { params, server, clientIp, geo } = context;
  return new Response(
    "Context from node-functions!" +
      JSON.stringify({ params, server, clientIp, geo })
  );
};
