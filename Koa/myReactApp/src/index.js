import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import router from './router';
// console.log("test:", process.env.REACT_APP_REQUEST_BASE_URL);
// console.log('process.env.NODE_ENV:', process.env.REACT_APP_ENV);
// console.log('222222222222222:', process.env);

ReactDOM.createRoot(document.getElementById('root')).render(
    <App></App>
    // <BrowserRouter router={router}></BrowserRouter>
)


