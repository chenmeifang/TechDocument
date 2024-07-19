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
        console.log('login');
        http.post('/users/login', {
            userName,
            pwd: password
        }).then(function (response) {
            console.log(response);
            const token = response.data.token;
            document.cookie = `zdocs_token=${token}`;
            // 2.跳转到fileList页面
            // navigate('/fileList', { replace: true });
            history.replace('/fileList')
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

