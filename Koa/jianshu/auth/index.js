let jwt = require("jsonwebtoken");

// type User = {
//   username: string;
//   pwd: number;
// };

// const generateToken = (params: User) => {
const generateToken = (params) => {
  // 第一个参数：载荷 payload
  // 第二个参数：签名 ？verify signature
  let token = jwt.sign(params, process.env.JWT_SECRET);
  return token;
};

const authorizeByToken = async (ctx, next) => {
  // 先获取请求头上的token
  // 然后借用jsonwebtoken验证token是否正确
  const token = ctx.header.authorization;
  console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET);
  console.log("token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);
    // decoded: { username: 'admin', pwd: '1223', iat: 1721365348 }
    // 解析出来后跟什么去对比？？？不需要去对比，如果token对不上，verify的时候会直接抛出异常
    await next();
  } catch (error) {
    ctx.body = {
      code: 400,
      message: "无效Token，请跳转到登录页面",
    };
  }
};

module.exports = { generateToken, authorizeByToken };
