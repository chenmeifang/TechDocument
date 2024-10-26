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
// exec('dir', (err, stdout, stderr) => {
//   console.log('stdout:', stdout);
// })

const child = exec('dir');
child.stdout.on('data', (data) => {
  console.log('data:', data);
})

child.stderr.on('data', (err) => {
  console.log('err:', err);
})
