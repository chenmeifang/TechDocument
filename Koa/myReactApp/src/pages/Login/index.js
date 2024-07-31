import React from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// useNavigate应该是6版本的属性??
import { http } from '../../utils/request'

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();
    const history = useHistory();

    const login = () => {
        // 1.发送请求到后台，获取token
        http.post('/users/login', {
            username: userName,
            pwd: password
        }).then(function (response) {
            console.log(response);
            if (response.data.code == 200) {
                const token = response.data.token;
                // console.log('cookie0：', document.cookie);
                // document.cookie = `zdocs_token=${token}`;
                document.cookie = `${token}`;
                // console.log('cookie1：', document.cookie);

                // 2.跳转到fileList页面
                history.replace('/fileList')
            } else {
                alert('Invalid credentials');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const changeUserName = (event) => {
        setUserName(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <div>登录页面</div>
            <label>用户名：</label>
            <input type="text" value={userName} onChange={changeUserName}></input>
            <br />
            <label>密码：</label>
            <input type="password" value={password} onChange={changePassword}></input>
            <br />
            <button onClick={login}>登录</button>
        </>
    )
}
export default Login;

