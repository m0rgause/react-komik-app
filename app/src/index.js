import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetail from './dist/Containers/book_detail';
import NavBar from './dist/Components/nav_bar';
import Home from './dist/Containers/home';
import Footer from './dist/Components/footer';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:path" element={<BookDetail />} />
        </Routes>
      </div>
      <section className="footer">
        <Footer />
      </section>
    </BrowserRouter>
  </React.StrictMode >
);