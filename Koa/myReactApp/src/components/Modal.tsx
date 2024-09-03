import React, { useEffect } from "react";
import "./Model.css";

export default function Modal({
  title = "默认标题",
  isOpen = false,
  onClose = () => {},
  children = <></>,
}) {
  console.log("child:", children);
  console.log("isOpen:", isOpen);
  useEffect(() => {
    // 禁止背景滚动
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  if (!isOpen) return null;
  // todo：验证这个组件是否会被销毁，如何销毁
  // 暂时先不考虑销毁的事情
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="model-header">
          {/* todo: 不希望使用h3，应如何处理 */}
          <h3>{title}</h3>
          {/* question：1. 弹框的关闭函数是外面传还是自己写——外面传递*/}
          <button onClick={onClose}>关闭图标</button>
        </div>
        <div className="model-body">{children}</div>
        <div className="model-footer"></div>
      </div>
    </div>
  );
}
