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
        if (res.data.code === 200) {
          setFileList(res.data.data);
        } else {
          // 无效Token，跳转到登录页
          history.replace("/login");
        }
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
    // form.append("file", file);
    // /api/local/entries
    console.log("开始上传文档：", new Date());
    // 文档分块上传，自定义每个块的大小
    const chunkSize = 1024 * 1024 * 1000; // 1024*1024=1MB
    // 块数
    const totalChunks = Math.ceil(file.size / chunkSize);
    const promises = [];
    const uploadChunk = (chunk, chunkNumber, totalChunks) => {
      const formData = new FormData();
      formData.append("file", chunk, file.name);
      formData.append("chunkNumber", chunkNumber);
      formData.append("totalChunks", totalChunks);
      return http.post("/file/upload2", formData);
    };
    for (let start = 0; start < file.size; start += chunkSize) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const chunkNumber = start / chunkSize + 1;
      promises.push(uploadChunk(chunk, chunkNumber, totalChunks));
    }
    Promise.all(promises).then((res) => {
      console.log("文件分片上传的结果：", res);
      console.log("文档上传结束：", new Date());
    });
    // http
    //   .post("/file/upload2", form)
    //   .then((res) => {
    //     console.log("文件上传的结果res:", res);
    //     console.log("文档上传结束：", new Date());
    //   })
    //   .catch((err) => {
    //     console.log("文件上传的结果err:", err);
    //   });
  };
  // let eTag =
  const staticRequest = () => {
    fetch("http://localhost:3000/file/image.jpg", {
      headers: {
        // "Cache-Control": "no-cache", // 根据需要设置 Cache-Control 的值
      },
    }).then((res) => {
      console.log("图片请求：", res);
    });
    // http.get("/file/image.jpg").then((res) => {
    //   console.log("res:", res);
    // });
  };

  return (
    <div>
      <button onClick={staticRequest}>发送一个静态文件请求</button>
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
