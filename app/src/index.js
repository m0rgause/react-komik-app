import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetail from './dist/Containers/book_detail';
import BookReader from './dist/Containers/book_reader';
import NavBar from './dist/Components/nav_bar';
import Home from './dist/Containers/home';
import Search from './dist/Containers/search';
import Footer from './dist/Components/footer';
import History from './dist/Containers/history';
import Genres from './dist/Containers/genres';
import Galleries from './dist/Containers/galleries';
import Bookmark from './dist/Containers/bookmarks';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:path" element={<BookReader />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/history" element={<History />} />
          <Route path="/galleries/:uri?/:page?" element={<Galleries />} />
          <Route path="/book/:path" element={<BookDetail />} />
          <Route path="/search/:page?" element={<Search />} />
          <Route path="/genres/:path/:page?" element={<Genres />} />
        </Routes>
      </div>
      <section className="footer">
        <Footer />
      </section>
    </BrowserRouter>
  </React.StrictMode >
);