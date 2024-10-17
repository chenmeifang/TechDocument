import './App.css';
import Button, { ButtonSize, ButtonType } from './components/Button/button.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus onClick={() => {
          console.log('111');
        }}>测试111</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>测试222</Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com'>测试222</Button>
      </header>
    </div>
  );
}

export default App;
