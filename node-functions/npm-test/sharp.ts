import sharp from 'sharp';

// Accepts POST requests to process an image using sharp
// - If body contains binary image (image/* or application/octet-stream), it will be resized
// - If body is JSON with { imageUrl }, the image will be fetched and then processed
// - Otherwise, a simple generated image will be returned

export const onRequestPost = async (context: any): Promise<Response> => {
  try {
    const request: Request = context.request;
    const contentType = request.headers.get('content-type') || '';

    let inputBuffer: Buffer;

    if (contentType.startsWith('image/') || contentType.startsWith('application/octet-stream')) {
      const arrayBuffer = await request.arrayBuffer();
      inputBuffer = Buffer.from(arrayBuffer);
    } else if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      const imageUrl: string | undefined = body?.imageUrl;
      if (!imageUrl) {
        return new Response(JSON.stringify({ error: 'Missing imageUrl in JSON body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const resp = await fetch(imageUrl);
      if (!resp.ok) {
        return new Response(JSON.stringify({ error: `Failed to fetch image: ${resp.status}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const arrayBuffer = await resp.arrayBuffer();
      inputBuffer = Buffer.from(arrayBuffer);
    } else {
      // Fallback: generate a simple 200x200 image as input
      // This ensures sharp is executed even without user-provided image
      const generated = await sharp({
        create: {
          width: 200,
          height: 200,
          channels: 3,
          background: { r: 220, g: 20, b: 60 },
        },
      })
        .png()
        .toBuffer();
      inputBuffer = generated;
    }

    // Process image: resize to 256x256 and convert to PNG
    const output = await sharp(inputBuffer)
      .rotate()
      .resize(256, 256, { fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toBuffer();

    return new Response(output, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: 'Sharp processing failed', error: err?.message || String(err) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};

export const onRequestGet = async (_context: any): Promise<Response> => {
  // Simple info endpoint to verify the route is deployed
  return new Response(
    JSON.stringify({
      message: 'Use POST to process an image with sharp',
      usage:
        'POST /node-functions/npm-test/sharp with binary body (image/*) or JSON {"imageUrl": "https://..."}',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
