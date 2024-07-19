import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import router from './router';


ReactDOM.createRoot(document.getElementById('root')).render(
    <App></App>
    // <BrowserRouter router={router}></BrowserRouter>
)


