> node如何管理进程的调度？主线程和子线程如何交互的？

# JS-Node-单进程-多进程-单线程-多线程

JavaScript 在浏览器环境和 Node.js 环境中运行时的表现略有不同，但总体来说，它是 **单进程、单线程** 的语言。

### 单线程
JavaScript 的执行是单线程的，这意味着它在一个时间点只能执行一个任务。单线程意味着所有代码都是在一个主线程中依次运行的，这种模型有助于避免复杂的同步问题，如数据竞争和死锁。

- 在 **浏览器环境** 下，JavaScript 的主线程同时负责处理用户交互（如点击事件）、DOM 渲染、脚本执行等。
- 在 **Node.js 环境** 下，JavaScript 也遵循单线程模型，但通过事件循环机制和异步 I/O 来实现高效的任务处理。

### 单进程
JavaScript 运行在单个进程中，尤其是在浏览器里，所有代码共享同一个主线程、同一个内存空间。Node.js 也是单进程的，默认情况下运行在单个主进程中，但通过 `child_process` 模块或集群模式（`cluster`）可以创建多个子进程来分担任务。

### 异步与多线程模型的补充
尽管 JavaScript 是单线程的，但现代浏览器和 Node.js 提供了多种机制来让 JavaScript 代码“看起来”是并行执行的。以下是一些机制：

1. **异步回调**：JavaScript 通过事件循环和回调机制来处理异步任务，使得长时间运行的操作（如 I/O、网络请求）不会阻塞主线程。

2. **Promise 和 async/await**：Promise 是管理异步操作的常见方式，而 `async/await` 是语法糖，简化了异步代码的书写。

3. **Web Workers（多线程）**：在浏览器中，可以使用 Web Workers 来创建独立的线程执行一些任务（如数据处理），这些线程不能访问 DOM，通常用于执行耗时的计算，以避免阻塞主线程。

4. **Node.js Worker Threads**：Node.js 提供 `worker_threads` 模块，可以在多线程环境中执行计算密集型任务，同样不会阻塞主线程。

总的来说，虽然 JavaScript 本身是单进程、单线程的，但通过事件循环、异步操作和多线程的辅助机制，JavaScript 仍然可以处理并发任务。

# [4-1 多进程与多线程介绍](https://www.bilibili.com/video/BV1uM4y1r7Qt?spm_id_from=333.788.videopod.episodes&vd_source=a7089a0e007e4167b4a61ef53acc6f7e&p=57)

## 为什么要使用多进程

JS是一门单线程语言

Node.js 使用多进程（或子进程）机制的主要原因在于它的 **单线程事件循环模型** 在处理 **CPU 密集型任务** 或者**多核利用**时的局限性。通过使用多进程，Node.js 可以提高性能、扩展性和容错能力，尤其在以下场景中具有优势：

### 1. **利用多核 CPU**
Node.js 是单线程运行的，这意味着默认情况下它只能使用一个 CPU 核心。如果你的服务器有多个 CPU 核心，单线程模型无法充分利用硬件资源。而通过创建多个子进程或者使用 **集群（Cluster）模式**，Node.js 可以在多个 CPU 核心上运行多个进程，从而并行处理任务，提高吞吐量。

- **Cluster 模式**：通过 `cluster` 模块，Node.js 可以轻松启动多个进程（通常称为 "worker"），每个 worker 是主进程的一个副本，监听相同的端口。当有请求进来时，Node.js 会将请求分发给不同的 worker，从而在多核服务器上并行处理请求。

### 2. **避免阻塞主线程**
Node.js 是单线程的，所有 I/O 操作（如文件读取、网络请求）是非阻塞的，但 CPU 密集型操作（如复杂的计算或加密操作）会阻塞事件循环，导致无法响应其他请求。如果主线程被阻塞，整个应用都会陷入“假死”状态。

通过多进程，CPU 密集型任务可以在子进程中执行，不会阻塞主线程的事件循环。例如：
- 在主线程中处理网络请求、数据库查询等 I/O 密集型任务。
- 将复杂的计算任务（如加密、图像处理）分配给子进程，避免对主线程的影响。

### 3. **更好的错误隔离**
在单个进程中运行所有代码意味着，如果某个代码块崩溃（如发生未捕获的异常），可能会导致整个进程崩溃。使用多进程可以提高容错能力，因为某个子进程崩溃不会影响主进程和其他子进程。你可以通过检测到崩溃后重启子进程，保持应用稳定运行。

### 4. **任务并行化**
Node.js 可以使用 `child_process` 模块创建独立的子进程来处理特定任务。子进程可以通过消息传递与主进程通信，执行一些耗时的任务，从而达到并行处理任务的效果。典型应用场景包括：
- 视频/音频文件的处理（如压缩、编码）。
- 数据库的大量计算或查询操作。
- 各种批处理任务。

### 5. **横向扩展应用**
对于高流量的应用，多进程架构允许 Node.js 实现水平扩展，处理大量并发连接。多个进程可以均匀地分配请求，从而最大限度地提高应用的可扩展性和响应能力。

### 6. **集成外部系统**
Node.js 的多进程机制不仅仅用于分担工作负载，还可以用于与外部系统交互。你可以使用 `child_process.spawn()` 来调用其他语言的程序或脚本，例如 Python、C++ 或 Java，执行一些 Node.js 不擅长处理的任务（如硬件交互、复杂算法）。

### 例子：使用 `child_process` 创建子进程
```js
const { spawn } = require('child_process');

// 启动一个新的子进程来执行 `ls` 命令
const child = spawn('ls', ['-lh', '/usr']);

child.stdout.on('data', (data) => {
  console.log(`子进程输出: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`子进程错误: ${data}`);
});

child.on('close', (code) => {
  console.log(`子进程退出，退出码: ${code}`);
});
```

### 总结
Node.js 使用多进程机制，主要是为了**充分利用多核 CPU**、**避免 CPU 密集型任务阻塞事件循环**、**提高容错能力**、**实现任务并行化**，以及**横向扩展应用**。这些特性补足了 Node.js 单线程模型的不足，使其能够在高并发环境中有效运行。

## 多进程和多线程的区别



## NodeJS开启多线程和多进程的方法

## cluster原理介绍

