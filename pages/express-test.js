import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ExpressTest() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 测试配置
  const testRoutes = [
    {
      name: 'Express Root',
      path: '/express',
      description: '测试 /express 根路径'
    },
    {
      name: 'Users with ID',
      path: '/express/users/123/testparam',
      description: '测试 /express/users/:id/:sdasdadad 动态路由'
    },
    {
      name: 'Check Context',
      path: '/express/context',
      description: '查看 req.context 内容'
    }
  ];

  // 执行单个测试
  const runSingleTest = async (route) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(route.path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      setTestResults(prev => ({
        ...prev,
        [route.path]: {
          status: response.status,
          statusText: response.statusText,
          data: data,
          headers: Object.fromEntries(response.headers.entries()),
          timestamp: new Date().toISOString()
        }
      }));
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        [route.path]: {
          error: err.message,
          timestamp: new Date().toISOString()
        }
      }));
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 运行所有测试
  const runAllTests = async () => {
    setLoading(true);
    setError(null);
    
    for (const route of testRoutes) {
      await runSingleTest(route);
      // 添加小延迟避免请求过于频繁
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setLoading(false);
  };

  // 清除测试结果
  const clearResults = () => {
    setTestResults({});
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Express Function Test</title>
        <meta name="description" content="Test Express function routes" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Express Function 测试页面
          </h1>
          <p className="text-lg text-gray-600">
            测试 Express 函数的不同路由和参数
          </p>
        </div>

        {/* 控制按钮 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={runAllTests}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '测试中...' : '运行所有测试'}
            </button>
            
            <button
              onClick={clearResults}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              清除结果
            </button>
          </div>
        </div>

        {/* 测试路由列表 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testRoutes.map((route, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {route.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {route.description}
              </p>
              <p className="text-xs font-mono bg-gray-100 p-2 rounded mb-4">
                {route.path}
              </p>
              
              <button
                onClick={() => runSingleTest(route)}
                disabled={loading}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                测试此路由
              </button>

              {/* 显示测试结果 */}
              {testResults[route.path] && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-gray-900 mb-2">测试结果:</h4>
                  
                  {testResults[route.path].error ? (
                    <div className="text-red-600 text-sm">
                      ❌ 错误: {testResults[route.path].error}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">状态:</span>{' '}
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          testResults[route.path].status >= 200 && testResults[route.path].status < 300
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {testResults[route.path].status} {testResults[route.path].statusText}
                        </span>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">响应数据:</span>
                        <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-x-auto">
                          {JSON.stringify(testResults[route.path].data, null, 2)}
                        </pre>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        测试时间: {new Date(testResults[route.path].timestamp).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 错误显示 */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">测试过程中出现错误</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">使用说明</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• 点击&ldquo;运行所有测试&rdquo;可以一次性测试所有路由</p>
            <p>• 点击单个路由的&ldquo;测试此路由&rdquo;按钮可以单独测试</p>
            <p>• 测试结果会显示状态码、响应数据和测试时间</p>
            <p>• 如果出现错误，会在下方显示错误信息</p>
            <p>• 使用&ldquo;清除结果&rdquo;按钮可以清空所有测试结果</p>
          </div>
        </div>
      </div>
    </div>
  );
} 