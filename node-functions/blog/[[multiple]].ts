export default function onRequest(context) {
  return new Response("Blog multiple match:" + JSON.stringify(context.params.multiple));
}
