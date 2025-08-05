// 测试所有 HTTP 方法的函数
export const onRequestGet = (context) => {
  return new Response(
    JSON.stringify({
      method: "GET",
      message: "GET request successful",
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(Object.entries(context.request.headers)),
      url: context.request.url,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "GET",
      },
    }
  );
};

export const onRequestPost = (context) => {
  return new Response(
    JSON.stringify({
      method: "POST",
      message: "POST request successful",
      timestamp: new Date().toISOString(),
      clientIp: context.clientIp,
      geo: context.geo,
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "POST",
      },
    }
  );
};

export const onRequestPut = (context) => {
  return new Response(
    JSON.stringify({
      method: "PUT",
      message: "PUT request successful",
      timestamp: new Date().toISOString(),
      env: context.env.NODE_ENV || "development",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "PUT",
      },
    }
  );
};

export const onRequestPatch = (context) => {
  return new Response(
    JSON.stringify({
      method: "PATCH",
      message: "PATCH request successful",
      timestamp: new Date().toISOString(),
      server: context.server,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "PATCH",
      },
    }
  );
};

export const onRequestDelete = (context) => {
  return new Response(
    JSON.stringify({
      method: "DELETE",
      message: "DELETE request successful",
      timestamp: new Date().toISOString(),
      uuid: context.uuid,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "DELETE",
      },
    }
  );
};

export const onRequestHead = (context) => {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Test-Method": "HEAD",
      "X-Custom-Header": "HEAD request successful",
      "X-Timestamp": new Date().toISOString(),
    },
  });
};

export const onRequestOptions = (context) => {
  return new Response(
    JSON.stringify({
      method: "OPTIONS",
      message: "OPTIONS request successful",
      timestamp: new Date().toISOString(),
      allowedMethods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
      ],
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
};

// 处理所有其他方法的通用处理器
export const onRequest = (context) => {
  const method = context.request.method;

  return new Response(
    JSON.stringify({
      method: method,
      message: `${method} request handled by generic onRequest`,
      timestamp: new Date().toISOString(),
      context: {
        clientIp: context.clientIp,
        geo: context.geo,
        uuid: context.uuid,
        server: context.server,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Test-Method": "ALL",
        "X-Actual-Method": method,
      },
    }
  );
};
