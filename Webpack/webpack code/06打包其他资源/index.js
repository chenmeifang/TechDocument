// __filename:当前模块的完整路径
// __dirname:当前模块所在文件夹的完整路径
console.log('__filename', __filename)
// E:\TechDocument\Webpack\webpack code\06打包其他资源\index.js
console.log('__dirname',__dirname)
// E:\TechDocument\Webpack\webpack code\06打包其他资源

// 引入iconfont样式文件
// 引入方式错误
{/* <link rel="stylesheet" href="./iconfont.css"> */}
import './iconfont.css';
