// console.log('process.argv:', process.argv);
// console.log(process.env)
// console.log(process.pid)
// console.log(process.platform)
// console.log(process.versions)
// console.log(process.cwd())
const exec = require('child_process').exec;
// ls在大多数UNIX/Linux系统上有效，但如果在Windows系统上运行代码，
// ls可能找不到，导致命令执行失败
// Windows的等效命令是dir
exec('dir', (err, stdout, stderr) => {
  if(err){
    console.log('stderr:', stderr);
  }
  // 输出乱码的原因：
  //  windows的cmd.exe默认使用的是GBK编码
  //  而NodeJS默认使用UTF-8编码来处理stdout和stderr
  // 解决：用wsl控制台即可
  console.log('stdout:', stdout);
  // 输出：houduan.js  process.js  vm.js   websocket.ts  事件循环2.js
  // index.html  test.txt  websocket.js  事件循环.js
})


// 另一个等同写法：
const child = exec('dir');
child.stdout.on('data', (data) => {
  console.log('data:', data);
})

child.stderr.on('data', (err) => {
  console.log('err:', err);
})
