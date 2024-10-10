import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import FileList from './pages/FileList';
import FileEdit from './pages/FileEdit/index.jsx';

const App = () => {
    return (
        <Router>
            {/* <Routes> */}
            {/* 注册路由 */}
            <Route path="/login" component={Login} />
            <Route path="/fileList" component={FileList} />
            <Route path="/fileEdit" component={FileEdit} />
            {/* </Routes> */}
        </Router>
    )
}

export default App;