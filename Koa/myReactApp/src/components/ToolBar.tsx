import React, { useState } from "react";
import Modal from "./Modal";

export default function ToolBar() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [title, setTitle] = useState("默认标题");
  const [style, setStyle] = useState({});

  const insertLink = () => {
    // 要打开一个弹框组件
    setModelOpen(true);
    setTitle("插入超链接");
  };
  const pageSetting = () => {
    // 要打开一个弹框组件
    setModelOpen(true);
    setTitle("页面设置");
  };
  const findAndReplace = () => {
    setModelOpen(true);
    setTitle("查找替换");
    setStyle({ backgroundColor: "red", top: "40px", position: "absolute" });
  };
  const closeModal = () => {
    setModelOpen(false);
    setTitle("");
    setStyle({});
  };
  return (
    <div>
      里面有很多按钮
      <button onClick={insertLink}>插入超链接</button>
      <button onClick={pageSetting}>页面设置</button>
      <button onClick={findAndReplace}>查找替换</button>
      <Modal
        isOpen={isModelOpen}
        title={title}
        onClose={closeModal}
        style={style}
      >
        <div>内部内容</div>
      </Modal>
    </div>
  );
}
