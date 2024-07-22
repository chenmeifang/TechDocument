import { sendOutMsgWithoutDealUndoRedo } from "../msg/msgCenter";
import { receiveMessage } from "../msg/msgHandler";

let stack = [];
let index = 0;

const undo = (originText: string) => {
  let action = stack[index];
  index--;
  let msgList = action?.undo;
  let text = receiveMessage(msgList[0], originText);
  sendOutMsgWithoutDealUndoRedo(msgList);
  return text;
};

const redo = () => {
  //
};

const addUndo = (msgList, rMsgList) => {
  let action = {
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
