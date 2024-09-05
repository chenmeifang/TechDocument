import React from "react";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { http } from "../../utils/request";
import { AxiosResponse } from "axios";

const FileList = () => {
  const [fileList, setFileList] = useState<
    Array<{ docId: string; title: string }>
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const MAX_RETRIES = 3; // 文件分片上传最大重传次数
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
  /**
   * 发送请求，新建一个文件
   * @param event
   */
  const createNewFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("event:", event);
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

  /**
   *
   * @param isSlice 是否采用分片上传的形式
   */
  const onUploadClick = (isSlice: boolean) => {
    // 'inputRef2.current' is possibly 'undefined'.ts(18048)
    // (property) React.MutableRefObject<undefined>.current: undefined
    if (isSlice) {
      inputRef2?.current?.click();
    } else {
      inputRef?.current?.click();
    }
  };

  // 选择了一个文件的时候触发
  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    file && _upload(file);
  };

  const upload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    file && _upload2(file);
  };

  // 普通上传
  const _upload = (file: File) => {
    const form: FormData = new FormData();
    form.append("file", file);
    // /api/local/entries
    console.log("开始上传文档：", new Date());
    http
      .post("/file/upload", form)
      .then((res) => {
        console.log("文件上传的结果res:", res);
        console.log("文档上传结束：", new Date());
      })
      .catch((err) => {
        console.log("文件上传的结果err:", err);
      });
  };

  // 分片上传
  const _upload2 = (file: File) => {
    console.log("开始分片上传文档：", new Date());
    // 文档分块上传，自定义每个块的大小
    const chunkSize = 1024 * 1024 * 400; // 1024*1024=1MB
    // 块数
    const totalChunks = Math.ceil(file.size / chunkSize);
    const promises = [];
    const uploadChunk = (
      chunk: Blob,
      chunkNumber: string,
      totalChunks: string,
      retries = 0
    ) => {
      // append(name: string, value: string | Blob, filename?: string): void;
      const formData = new FormData();
      formData.append("file", chunk, file.name);
      formData.append("chunkNumber", chunkNumber);
      formData.append("totalChunks", totalChunks);
      // let promise = http.post("/file/upload2", formData)
      let promise: Promise<string | AxiosResponse<any, any> | undefined> = http
        .post("/file/upload2", formData)
        .catch(() => {
          // 捕获分片上传异常，并重新上传
          if (retries < MAX_RETRIES) {
            console.error(
              `Chunk ${chunkNumber} upload failed. Retrying... Attempt ${
                retries + 1
              }`
            );
            return uploadChunk(chunk, chunkNumber, totalChunks, retries + 1);
          } else {
            // 超过了重新上传的最大次数
            // 怎么处理.......
            console.error(`Failed after ${MAX_RETRIES} attempts`);
            // 页面弹出一个框，提示用户重新上传（提供重新上传的按钮）
            // 但是后端怎么处理呢？？那些临时目录的文件需要删除吗？？
            throw new Error("文件上传超出了重新上传的最大次数");
            // 在这里抛出error，在promise.all那里catch统一处理
          }
        });
      return promise;
    };
    for (let start = 0; start < file.size; start += chunkSize) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const chunkNumber = start / chunkSize + 1;
      // 注意：请求是在每次调用uploadChunk时发出的
      // 调用uploadChunk时，函数立即开始发送HTTP请求，并返回一个代表该请求的Promise
      promises.push(
        uploadChunk(chunk, chunkNumber.toString(), totalChunks.toString())
      );
    }
    // 注意：Promise.all的作用是只是等待所有请求完成，而不是发送请求
    Promise.all(promises)
      .then((res) => {
        console.log("文件分片上传的结果：", res);
        console.log("文档分片上传结束：", new Date());
      })
      .catch((err) => {
        // 分片上传发送异常。我们需捕获异常，并重新上传
        // 注意：
        //  可以通过Promise.all捕获整体异常，
        //  但无法直接在Promise.all内重新上传失败的分片
        //  可以单独在每个Promise内捕获异常，并实现重传逻辑
        console.log("all err:", err);
      });
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
      <button
        onClick={() => {
          onUploadClick(false);
        }}
      >
        上传一个文件
      </button>
      <button
        onClick={() => {
          onUploadClick(true);
        }}
      >
        分片上传一个文件
      </button>
      <input type="file" ref={inputRef} onChange={upload}></input>
      <input type="file" ref={inputRef2} onChange={upload2}></input>
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
