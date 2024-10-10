import React from 'react';
import { useEffect, useRef } from 'react';
import DiffMatchPatch from 'diff-match-patch';

import socket from '../../msg/socket';
import { sendMsg, createInsertTextActPair } from '../../msg/msgCenter.ts';
import { receiveMessage } from '../../msg/msgHandler.ts';
import { undo } from '../../undoRedoManager/undoRedoManager.ts';
import ToolBar from '../../components/ToolBar.tsx';
import './index.css';

// 用于在新窗口显示编辑文件内容
const FileEdit = () => {
  const editorRef = useRef(null);
  // const [prevCompressedMsgs, setPrevCompressedMsg] = useState([]);
  let previousContent = editorRef?.current?.innerHTML || '';
  const dmp = new DiffMatchPatch();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('client connect', socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('edit', (msgList) => {
      // msg: [{start, len, cnt, type}]
      // console.log("client监听到server发过来的消息", msgList);
      editorRef.current.innerHTML = receiveMessage(
        msgList[0],
        editorRef.current.innerHTML
      );
    });
  });

  // todo：需要在这里接收路由参数——docId
  const handleInput = (event) => {
    console.log('编辑了，需要发消息出去:', event.target.innerHTML);
    const diff = dmp.diff_main(previousContent, event.target.innerHTML);
    previousContent = event.target.innerHTML;
    // 编辑了，先把消息存储起来，等待特定时间后批量发送
    // 1.compress continuous insert/delete text message
    // 注意：不是压缩所有的消息，也不是所有的消息都要等待特定的时候后发送
    const actPair = createInsertTextActPair(
      getCaretCharacterOffset(event) - 1,
      1,
      diff[diff.length - 1][1]
    );
    // const msg = {
    //   index: getCaretCharacterOffset(event),
    //   len: 1,
    //   cnt: diff[diff.length - 1][1],
    //   type: "insert",
    // };
    const msg = {
      msg: actPair.act,
      rMsg: actPair.rAct,
    };
    sendMsg([msg]);
  };

  // 获取光标的偏移量
  const getCaretCharacterOffset = (event) => {
    let caretOffset = 0;
    console.log('caretOffset:', caretOffset);
    const doc = event.target.ownerDocument;
    const win = doc.defaultView;
    const sel = win.getSelection();
    if (sel.rangeCount) {
      // const range = sel.getRangeAt(0);
      // todo: 先使用selection，看后面有啥问题，再改成range
      caretOffset = sel.focusOffset;
    }
    return caretOffset;
  };

  const handleUndo = () => {
    editorRef.current.innerHTML = undo(editorRef.current.innerHTML);
  };

  return (
    <div>
      <ToolBar></ToolBar>
      查看文件
      <button onClick={handleUndo}>undo</button>
      <div
        contentEditable
        onInput={handleInput}
        className="editor"
        ref={editorRef}
        onMouseUp={getCaretCharacterOffset}
      ></div>
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容
      假装有很多内容假装有很多内容 假装有很多内容假装有很多内容 假装有很多内容
      假装有很多内容 假装有很多内容 假装有很多内容 假装有很多内容假装有很多内容
      假装有很多内容
    </div>
  );
};

export default FileEdit;
