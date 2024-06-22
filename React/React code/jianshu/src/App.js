import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // 定义状态变量
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 定义一个异步函数来发送请求
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/find');
        setData(response.data)
        console.log('data:', response.data)
      } catch (error) {
        console.log('error:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    // 调用异步函数
    fetchData()
  }, []) // 空数组表示仅在组件挂载和卸载时执行一次

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
