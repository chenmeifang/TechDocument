import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// useNavigate应该是6版本的属性??
import { http } from '../../utils/request';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [count, setCount] = useState(0);

  // const navigate = useNavigate();
  const history = useHistory();
  const login = () => {
    // 1.发送请求到后台，获取token
    http
      .post('/users/login', {
        username: userName,
        pwd: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.code == 200) {
          const token = response.data.token;
          // console.log('cookie0：', document.cookie);
          // document.cookie = `zdocs_token=${token}`;
          document.cookie = `${token}`;
          // console.log('cookie1：', document.cookie);
          // 2.跳转到fileList页面
          history.replace('/fileList');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  let timeoutId: number | NodeJS.Timeout = -1;

  // 开启一个定时器
  const openSetTimeout = () => {
    timeoutId = setTimeout(() => {
      console.log('开启了一个定时器');
    }, 1000);
  };

  // 关闭一个定时器
  const clearSetTimeout = () => {
    console.log('关闭一个定时器');
    clearTimeout(timeoutId);
  };

  // let intervalId: number | NodeJS.Timeout = -1;
  // 重要：如果需要在多个渲染周期之间持久化非状态变量的值，可以使用useRef
  //       useRef创建的对象在组件的整个生命周期内保持不变，不会因重新渲染而重置
  const intervalRef = useRef<NodeJS.Timeout | number>(-1);
  const openSetInterval = () => {
    intervalRef.current = setInterval(() => {
      console.log(new Date());
    }, 1000);
  };

  const clearSetInterval = () => {
    clearInterval(intervalRef.current);
  };
  if (count > 0) {
    useEffect(() => {
      console.log('Count is greater than 0');
    }, []);
  }
  const addCount = () => {
    setCount(count + 1);
  };
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
      <br />
      <button onClick={openSetTimeout}>开启一个setTimeout定时器</button>
      <br />
      <button onClick={clearSetTimeout}>关闭一个setTimeout定时器</button>
      <br />
      <button onClick={openSetInterval}>开启一个setInterval定时器</button>
      <br />
      <button onClick={clearSetInterval}>关闭一个setInterval定时器</button>
      <br />
      <button onClick={addCount}>count++</button>
      <div>count: {count}</div>
    </>
  );
};
export default Login;
