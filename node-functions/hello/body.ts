/**
 * Vercel 兼容的 request.body 测试函数
 * 测试所有 Vercel 支持的 Content-Type 解析规则
 */

interface RequestContext {
  request: {
    method: string;
    headers: Record<string, string>;
    body: unknown;
  };
}

export async function onRequest(context: RequestContext) {
  const { request } = context;

  try {
    console.log("=== Vercel Body Test ===");
    console.log("Method:", request.method);
    console.log("Content-Type:", request.headers["content-type"]);
    console.log("Content-Length:", request.headers["content-length"]);

    const response: Record<string, unknown> = {
      testInfo: {
        method: request.method,
        contentType: request.headers["content-type"],
        contentLength: request.headers["content-length"],
        userAgent: request.headers["user-agent"],
      },
      bodyAnalysis: {},
      dataFormat: {},
    };

    // 分析 body 属性
    try {
      const body = request.body;
      const bodyType = typeof body;

      response.bodyAnalysis = {
        hasBody: body !== undefined,
        bodyType: bodyType,
        isNull: body === null,
        isBuffer: Buffer.isBuffer(body),
        isString: typeof body === "string",
        isObject:
          typeof body === "object" && body !== null && !Buffer.isBuffer(body),
      };

      // 根据 Vercel 的 Content-Type 规则验证
      const contentType = (request.headers["content-type"] || "")
        .split(";")[0]
        .trim()
        .toLowerCase();

      switch (contentType) {
        case "application/json":
          response.dataFormat = {
            expectedType: "object (parsed JSON)",
            actualType: bodyType,
            isCorrect:
              typeof body === "object" &&
              body !== null &&
              !Buffer.isBuffer(body),
            bodyValue: body,
          };
          break;

        case "application/x-www-form-urlencoded":
          response.dataFormat = {
            expectedType: "object (parsed form data)",
            actualType: bodyType,
            isCorrect:
              typeof body === "object" &&
              body !== null &&
              !Buffer.isBuffer(body),
            bodyValue: body,
          };
          break;

        case "text/plain":
          response.dataFormat = {
            expectedType: "string",
            actualType: bodyType,
            isCorrect: typeof body === "string",
            bodyValue: body,
            stringLength: typeof body === "string" ? body.length : 0,
          };
          break;

        case "application/octet-stream":
          response.dataFormat = {
            expectedType: "Buffer",
            actualType: bodyType,
            isCorrect: Buffer.isBuffer(body),
            bodyValue: Buffer.isBuffer(body)
              ? `<Buffer ${body.length} bytes>`
              : body,
            bufferSize: Buffer.isBuffer(body) ? body.length : 0,
          };
          break;

        case "":
          // 无 Content-Type 头部
          response.dataFormat = {
            expectedType: "undefined (no Content-Type)",
            actualType: bodyType,
            isCorrect: body === undefined,
            bodyValue: body,
          };
          break;

        default:
          // 其他类型，Vercel 默认返回 Buffer
          response.dataFormat = {
            expectedType: "Buffer (default for unknown types)",
            actualType: bodyType,
            isCorrect: Buffer.isBuffer(body),
            bodyValue: Buffer.isBuffer(body)
              ? `<Buffer ${body.length} bytes>`
              : body,
            bufferSize: Buffer.isBuffer(body) ? body.length : 0,
          };
      }

      // 如果是对象类型，显示详细信息
      if (typeof body === "object" && body !== null && !Buffer.isBuffer(body)) {
        response.objectDetails = {
          keys: Object.keys(body),
          keyCount: Object.keys(body).length,
          sampleData: body,
        };
      }

      // 如果是 Buffer，显示预览
      if (Buffer.isBuffer(body)) {
        response.bufferDetails = {
          size: body.length,
          preview: body.toString("utf-8", 0, Math.min(200, body.length)),
          hex: body.toString("hex", 0, Math.min(32, body.length)),
        };
      }

      // 错误处理测试
      response.errorHandling = {
        accessSuccessful: true,
        noExceptionThrown: true,
      };
    } catch (error) {
      // 测试错误处理（特别是 JSON 解析错误）
      response.errorHandling = {
        accessSuccessful: false,
        exceptionThrown: true,
        errorMessage: error.message,
        errorType: error.constructor.name,
        vercelLikeError:
          error.message.includes("JSON") || error.message.includes("Invalid"),
      };
    }

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (globalError) {
    return new Response(
      JSON.stringify({
        error: "Global error in test function",
        message: globalError.message,
        stack: globalError.stack,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// GET 请求处理 - 返回测试说明
export async function onRequestGet() {
  const testInstructions = {
    message: "Vercel Body Compatibility Test",
    description: "This function tests Vercel-compatible request.body parsing",
    supportedContentTypes: {
      "application/json": "Returns parsed JSON object",
      "application/x-www-form-urlencoded": "Returns parsed form data object",
      "text/plain": "Returns string",
      "application/octet-stream": "Returns Buffer",
      "no header": "Returns undefined",
      "other types": "Returns Buffer (default)",
    },
    testExamples: [
      {
        description: "Test JSON parsing",
        method: "POST",
        contentType: "application/json",
        body: '{"name": "test", "value": 123}',
      },
      {
        description: "Test form data parsing",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        body: "name=test&value=123",
      },
      {
        description: "Test plain text",
        method: "POST",
        contentType: "text/plain",
        body: "Hello, this is plain text!",
      },
      {
        description: "Test binary data",
        method: "POST",
        contentType: "application/octet-stream",
        body: "<binary data>",
      },
      {
        description: "Test malformed JSON (should throw error)",
        method: "POST",
        contentType: "application/json",
        body: '{"invalid": json}',
      },
    ],
    curlExamples: [
      'curl -X POST http://localhost:8088/vercel-body-test -H "Content-Type: application/json" -d \'{"test": "json"}\'',
      'curl -X POST http://localhost:8088/vercel-body-test -H "Content-Type: application/x-www-form-urlencoded" -d "name=test&value=123"',
      'curl -X POST http://localhost:8088/vercel-body-test -H "Content-Type: text/plain" -d "Hello World"',
      'curl -X POST http://localhost:8088/vercel-body-test -H "Content-Type: application/json" -d \'{"invalid": json}\' # Test error handling',
    ],
  };

  return new Response(JSON.stringify(testInstructions, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// OPTIONS 处理
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
