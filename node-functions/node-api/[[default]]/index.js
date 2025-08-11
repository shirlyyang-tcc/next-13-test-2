export default function onRequest(context) {
  return new Response('node-api/[[default]]:'+ JSON.stringify(context.params)  );
}