import React from 'react';
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';
import './index.css';

const socket = io('http://localhost:4000');

// 用于在新窗口显示编辑文件内容
const FileEdit = () => {
    const editorRef = useRef(null);
    useEffect(() => {
        socket.on("connect", () => {
            console.log('client connect', socket.id); // x8WIv7-mJelg7on_ALbx
        });
        socket.on("edit", (msg) => {
            console.log('client监听到服务器发过来的消息', msg);
            editorRef.current.innerHTML = msg;
        });
    })
    // todo：需要在这里接收路由参数——docId

    const handleInput = (event) => {
        console.log('编辑了，需要发消息出去:', event.target.innerHTML);
        socket.emit('edit', event.target.innerHTML);
    }
    return <>
        查看文件
        <div contentEditable
            onInput={handleInput}
            className="editor"
            ref={editorRef}
        >
        </div>
    </>
}

export default FileEdit;