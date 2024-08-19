import { sendOutMsgWithoutDealUndoRedo } from "../msg/msgCenter";
import { receiveMessage } from "../msg/msgHandler";
import { Message } from "../types/type";

type Action = {
  undo: Array<Message>;
  redo: Array<Message>;
};

let stack: Array<Action> = [];
let index = 0;

const undo = (originText: string) => {
  let action = stack[index];
  index--;
  let msgList: Array<Message> = action.undo;
  let text = receiveMessage(msgList[0], originText);
  sendOutMsgWithoutDealUndoRedo(msgList);
  return text;
};

const redo = () => {
  //
};

const addUndo = (msgList: Array<Message>, rMsgList: Array<Message>) => {
  let action: Action = {
    undo: [],
    redo: [],
  };
  action.undo = rMsgList;
  action.redo = msgList;
  stack.push(action);
  index = stack.length - 1;
};

const addRedo = () => {};

export { addUndo, undo };
