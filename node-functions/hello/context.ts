export const onRequest = async (context) => {
  // console.log("Context from node-functions!", context);
  const { request, params, server, clientIp, geo, uuid, env } = context;
  const json = await request.body.json;
  console.log("🚀 ~ onRequest ~ body:", json);
  return new Response(
    "Context from node-functions!" +
      JSON.stringify({ params, server, clientIp, geo, headers: context.request.headers, uuid, env })
  );
};
