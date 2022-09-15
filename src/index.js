import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const test = ReactDOM.createRoot(document.getElementById('root'));
test.render(<StrictMode><App /></StrictMode>)