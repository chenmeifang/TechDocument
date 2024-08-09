import React from "react";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { http } from "../../utils/request";

const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const inputRef = useRef();
  const history = useHistory();
  useEffect(() => {
    // 向数据库请求文件列表
    http
      .get("/file/myList")
      .then((res) => {
        console.log("res:", res);
        console.log("document.cookie:", document.cookie);
        // if (res.data.code === 200) {
        //   // setFileList(res.data.data);
        // } else {
        //   // 无效Token，跳转到登录页
        //   history.replace("/login");
        // }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);
  const fileListRequest = () => {
    http
      .get("/file/myList")
      .then((res) => {
        console.log("res:", res);
        // console.log("document.cookie:", document.cookie);
        // if (res.data.code === 200) {
        //   setFileList(res.data.data);
        // } else {
        //   // 无效Token，跳转到登录页
        //   history.replace("/login");
        // }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  const createNewFile = () => {
    // 发送请求，新建一个文件
    http
      .post("/file/addFile")
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  const openFile = () => {
    // todo：需要传递一下文档id
    const url = "/fileEdit";
    window.open(url);
  };

  const onUploadClick = () => {
    inputRef.current.click();
  };

  // 选择了一个文件的时候触发
  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("什么时候触发：", event.target.files);
    const file = event.target.files[0];
    _upload(file);
  };

  const _upload = (file: File) => {
    const form: FormData = new FormData();
    form.append("file", file);
    // /api/local/entries
    http
      .post("/file/upload", form)
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div>
      <button onClick={fileListRequest}>fileList请求</button>
      <button onClick={createNewFile}>新建一个文件</button>
      <button onClick={onUploadClick}>上传一个文件</button>
      <input type="file" ref={inputRef} onChange={upload}></input>
      {fileList.map((file) => {
        return (
          <div key={file.docId} onClick={openFile}>
            {file.title}
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
