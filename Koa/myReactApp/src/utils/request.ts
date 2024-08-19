import axios from 'axios';

// 创建实例时配置默认值
const http = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('config:', config);
    // 设置请求头中的Authorization字段
    config.headers.setAuthorization(document.cookie);
    // 查看withCredentials属性————结果是undefined——请求中未看到cookie
    // 验证设置withCredential属性后，请求中是否会携带cookie————结果请求失败。报以下错误：
    // Access to XMLHttpRequest at 'http://localhost:3000/file/myList' from origin 'http://localhost:8080' has been blocked by CORS policy: 
    // Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. 
    // The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
    // 错误解释：如果在发起请求时设置了'withCredentials: true', 服务器必须在响应中设置'Access-Control-Allow-Credentials'为true。(表明服务器端允许客户端发送过来的请求中包含cookie)
    // 验证结果：前端设置withCredential属性为true，以及后端设置'Access-Control-Allow-Credentials'为true后, 请求头中会携带cookie
    // config.headers['Cache-Control'] = 'no-cache'; // 你可以根据需要设置具体的值
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
// http.interceptors.response.use(function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response;
// }, function (error) {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });

export { http }