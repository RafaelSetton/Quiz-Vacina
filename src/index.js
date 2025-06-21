import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Footer from './Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='pb-48 2xl:pb-0 bg-blue-50 min-h-screen min-w-max justify-center content-center'>
      <App />
    </div>
    <Footer />
  </React.StrictMode>
);

