import { io, Socket } from "socket.io-client";
// 这里用http，不用ws没有问题吗？？
const socket: Socket = io("http://localhost:3000");
export default socket;
