import logo from './logo.svg';
import './App.css';
import * as React from 'react';

// function App() {
//   React.useEffect(() => {
//     console.log('测试钩子函数的调用');
//   }, [])
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'testname'
    }
  }
  componentDidMount() {
    this.setState({
      name: 'chenmmeifang'
    })
  }
  render() {
    return <div>ceshi{this.state.name}</div>
  }
}

export default App;
