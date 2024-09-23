import logo from './logo.svg';
import './App.css';
import Test from './Test';
import * as React from 'react';

function App() {
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
        <Test></Test>
      </header>
    </div>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'testname',
//       age: 18
//     }
//   }
//   componentDidMount() {
//     this.setState({
//       name: 'chenmmeifang'
//     })
//     this.setState({
//       age: 24
//     })
//   }
//   render() {
//     return <div>ceshi{this.state.name}{this.state.age}</div>
//   }
// }

export default App;
