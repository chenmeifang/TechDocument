import logo from './logo.svg';
import './App.css';
import * as React from 'react';

function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('cmf');
  // if (count > 0) {
  //   React.useEffect(() => {
  //     console.log("Count is greater than 0");
  //   }, []);
  // }
  const addCount = () => {
    // setCount(count + 1);
    setCount(count => count + 1)
    setCount(count => count + 2)
  };
  const changeName = () => {
    setName('chenmf')
  }
  return (
    <div className="App">
      <header className="App-header">
        <div onClick={addCount}>count++</div>
        <div>count: {count}</div>
        <div onClick={changeName}>名字</div>
        <div>name: {name}</div>
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
