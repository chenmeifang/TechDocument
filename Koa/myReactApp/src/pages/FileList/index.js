import React from 'react';
import { useEffect, useState } from 'react';
import { http } from '../../utils/request'

const FileList = () => {
    const [fileList, setFileList] = useState([])
    useEffect(() => {
        // 向数据库请求文件列表
        http.get('/file/myList').then(res => {
            console.log('res:', res);
            setFileList(res.data.data);
        }).catch(err => {
            console.log('err:', err);
        })
    }, [])
    const createNewFile = () => {
        // 发送请求，新建一个文件
        http.post('/file/addFile').then(res => {
            console.log('res:', res);
        }).catch(err => {
            console.log('err:', err);
        })
    }
    const openFile = () => {
        // todo：需要传递一下文档id
        const url = '/fileEdit';
        window.open(url)
    }

    return (
        <div>
            <button onClick={createNewFile}>新建一个文件</button>
            {
                fileList.map((file) => {
                    return <div key={file.docId} onClick={openFile}>{file.title}</div>
                })
            }
        </div>
    )
}

export default FileList;