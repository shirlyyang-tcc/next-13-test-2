export default function onRequest(context) {
  return new Response("Blog single match:" + context.params.single);
}
