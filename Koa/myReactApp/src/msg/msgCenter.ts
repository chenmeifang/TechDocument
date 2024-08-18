import socket from "./socket";
import { addUndo } from "../undoRedoManager/undoRedoManager";

type Message = {
  idx: number;
  len: number;
  cnt: string;
  type: string;
};

let prevCompressed = {
  msg: [],
  rMsg: [],
};

/**
 * combine new message to old message
 * AB -> ABC -> ABCD
 * the new message is insert D, the old message is insert C
 * @param {*} newMsg
 * @param {*} oldMsg
 */
const combineMsg = (newMsg: Message, oldMsg: Message) => {
  if (newMsg.idx === oldMsg.idx + oldMsg.len) {
    // Insert text: A -> AB -> ABC
    oldMsg.len += newMsg.len;
    oldMsg.cnt += newMsg.cnt;
    return true;
  }
  return false;
};

/**
 * 看是否是连续插入或者连续删除的操作
 * @param {*} msgList
 */
const isContinuedMsg = (msgList: Array<Message>) => {
  const msg = msgList[0];
  if (msg.type === "insert") {
    return true;
  }
};

// Compress continuous insert/delete text message
const compressMsg = (msgList: Array<Message>, rMsgList: Array<Message>) => {
  let msg: Message = msgList[0];
  if (prevCompressed.msg.length) {
    combineMsg(msg, prevCompressed.msg[0]);
  } else {
    prevCompressed.msg = msgList;
    prevCompressed.rMsg = rMsgList;
    setTimeout(() => {
      flushMessage();
    }, 5000);
  }
};

const flushMessage = () => {
  sendOutMsg(prevCompressed.msg, prevCompressed.rMsg);
  prevCompressed = {
    msg: [],
    rMsg: [],
  };
};

/**
 * 真正使用socket发送消息的地方
 * @param {*} msgList
 */
const sendOutMsg = (msgList: Array<Message>, rMsgList: Array<Message>) => {
  socket.emit("edit", msgList);
  addUndo(msgList, rMsgList);
};

// socket.emit和socket.broadcast.emit的区别：
// socket.emit: 只发送给当前的客户端
// socket.broadcast.emit: 发送给除当前客户端以外的所有其他客户端
export const sendOutMsgWithoutDealUndoRedo = (msgList: Array<Message>) => {
  socket.emit("edit", msgList);
};

/**
 * 供外部使用
 * @param msgPairList
 */
export const sendMsg = (msgPairList) => {
  let msgList: Array<Message> = [];
  let rMsgList: Array<Message> = [];
  for (let i = 0; i < msgPairList.length; i++) {
    let msg = msgPairList[i].msg;
    let rMsg = msgPairList[i].rMsg;
    msgList.push(msg);
    rMsgList.push(rMsg);
  }
  if (isContinuedMsg(msgList)) {
    compressMsg(msgList, rMsgList);
  } else {
    sendOutMsg(msgList, rMsgList);
  }
};

export const createInsertTextActPair = (
  index: number,
  length: number,
  cnt: string
) => {
  const act = createInsertTextAct(index, length, cnt);
  const rAct = createDeleteTextAct(index, length, cnt);
  return {
    act,
    rAct,
  };
};

const createInsertTextAct = (index: number, length: number, cnt: string) => {
  return {
    idx: index,
    len: length,
    type: "insert",
    cnt,
  };
};

const createDeleteTextAct = (index: number, length: number, cnt?: string) => {
  return {
    idx: index,
    len: length,
    type: "delete",
    cnt,
  };
};
