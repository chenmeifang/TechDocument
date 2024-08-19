import { Message } from "../types/type";

export const receiveMessage = (msg: Message, originText: string): string => {
  return processMessage(msg, originText);
};

const processMessage = (msg: Message, originText: string): string => {
  let text = "";
  if (msg.type === "insert") {
    // 插入文字
    text = originText.slice(0, msg.idx) + msg.cnt + originText.slice(msg.idx);
  } else if (msg.type === "delete") {
    // 删除文字
    text = originText.slice(0, msg.idx) + originText.slice(msg.idx + msg.len);
  }
  return text;
};
