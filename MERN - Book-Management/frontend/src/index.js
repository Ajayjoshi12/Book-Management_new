// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login/Login';
import AdminBook from './Admin Book Management/AdminBook';
import AddBook from './Add Book Management/AddBook';
import UserBook from './User Book Management/UserBook';
import EditBook from './Edit Book Management/EditBook';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route index element={<Login/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="admin" element={<AdminBook/>}/>
      <Route path="add" element={<AddBook/>}/>
      <Route path="edit" element={<EditBook/>}/>
      <Route path="user" element={<UserBook/>}/>
    </Routes>
  </BrowserRouter>
  // <div>
  //   <Navbar/>
  //   <Login/>
  //   <AdminBook/>
  //   <AddBook/>
  //   <UserBook/>
  //   <EditBook/>
  // </div>
);


