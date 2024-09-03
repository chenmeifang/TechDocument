import React, { useState } from "react";
import Modal from "./Modal";

export default function ToolBar() {
  const [isModelOpen, setModelOpen] = useState(false);
  const insertLink = () => {
    // 要打开一个弹框组件
    setModelOpen(true);
  };
  const pageSetting = () => {
    // 要打开一个弹框组件
    setModelOpen(true);
  };
  const closeModal = () => {
    setModelOpen(false);
  };
  return (
    <div>
      里面有很多按钮
      <button onClick={insertLink}>插入超链接</button>
      <button onClick={pageSetting}>页面设置</button>
      <Modal isOpen={isModelOpen} title="插入超链接" onClose={closeModal}>
        <div>内部内容</div>
      </Modal>
    </div>
  );
}
