export async function onRequest(context: { request: { method: string; headers: Record<string, string>; body: unknown } }) {
  const { request } = context;
  const query = request.query;
  const cookies = request.cookies;
  console.log("cookies:", cookies);
  return new Response(
    JSON.stringify({
      message:
        "query:" +
        JSON.stringify(query) +
        ":cookies:" +
        JSON.stringify(cookies) +
        ":request:" +
        JSON.stringify(request.url),
    }),
    {
      status: 200,
    }
  );
}