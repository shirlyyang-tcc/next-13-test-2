export const onRequest = (context) => {
  // console.log("Context from node-functions!", context);
  const { params, server, clientIp, geo, uuid } = context;
  return new Response(
    "Context from node-functions!" +
      JSON.stringify({ params, server, clientIp, geo, headers: context.request.headers, uuid })
  );
};
