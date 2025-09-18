export default function onRequest(req) {
  return new Response(JSON.stringify({ message: 'test' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}