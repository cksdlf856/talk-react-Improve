import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 개발테스트용으로 콘솔이 두번찍힘
    <App />
  // </React.StrictMode>
);
