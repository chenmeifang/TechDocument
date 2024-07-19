import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { http } from '../../utils/request'

const FileList = () => {
    const [fileList, setFileList] = useState([]);
    const history = useHistory();
    useEffect(() => {
        // 向数据库请求文件列表
        http.get('/file/myList').then(res => {
            console.log('res:', res);
            if (res.data.code === 200) {
                setFileList(res.data.data);
            } else {
                // 无效Token，跳转到登录页
                history.replace('/login');
            }
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