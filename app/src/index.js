import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetail from './dist/Components/book_detail';
import NavBar from './dist/Components/nav_bar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/book/:path" element={<BookDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);