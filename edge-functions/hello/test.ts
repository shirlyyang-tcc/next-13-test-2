export const onRequestGet = (context) => {
  return new Response('Hello, World from edge-functions get!');
};

export const onRequestPost = (context) => {
  return new Response('Hello, World from edge-functions post!');
};