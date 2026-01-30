import { Routes, Route } from 'react-router-dom';
import './App.css';

import { Login } from './pages/login';
import { Home } from './pages/home';
import { Products } from './pages/products';
import { Card } from './pages/card';
import { Profile } from './pages/profile';
import { Contact } from './pages/contact';
import { useState } from 'react';

function App() {
  const [cart,setcart] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<Home cart={cart} setcard={setcart}/>}>
        <Route index element={<Products/>} />
      </Route>
        <Route path="/card" element={<Card cart={cart}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact/>} />
    </Routes>
  );
}

export default App;
