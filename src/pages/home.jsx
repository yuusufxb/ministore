import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./card";
import './style/home.css'
export function Home({cart,setcard}){
    {/*add to card function*/}

    {/* fetching and loading data */}
    const [loading,setloading]=useState(false);
    const [products,setproducts]=useState([]);
    
    useEffect(()=>{
        setloading(true);
        const fetchproducts = async ()=>{
            const res = await fetch("https://dummyjson.com/products"); 
            const data = await res.json();
            setproducts(data.products);
            setloading(false);
        }
        fetchproducts();
    },[])
    const addtocart = (product) => {
    setcard(prev => {

      const found = prev.find(item => item.id === product.id);

      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          quantity: 1
        }
      ];
    });
  };

    {/* search bar */}
    const [searching,setsearching]=useState("");
    const filtredproducts = products.filter((pro)=>
                                pro.title.toLowerCase().includes(searching.toLowerCase()));
    return(
        <div id="container">
  {/* Navigation */}
  <nav id="navbar">
    <h1 id="brand">MiniStore</h1>

    <ul id="nav-links">
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/card">Card {cart.length}</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>

  {/* Main content */}
  <h1 id="title">MiniStore</h1>

  <input
    type="text"
    id="search"
    placeholder="Search"
    value={searching}
    onChange={(e) => setsearching(e.target.value)}
  />

  {loading && <p id="loading">Loading content...</p>}

  <div id="products">
    {filtredproducts.map((pro) => (
      <div key={pro.id} id="product-card">
        <img src={pro.images[0]} alt={pro.title} id="product-img" />
        <h3 id="product-title">{pro.title}</h3>
        <p id="product-price">${pro.price}</p>
        <button id="add-btn" onClick={() => addtocart(pro)}>
          Add to cart
        </button>
      </div>
    ))}
  </div>

  {/* Footer */}
  <footer id="footer">
    <p>&copy; {new Date().getFullYear()} MiniStore. All rights reserved.</p>
    <p>Your one-stop shop for the coolest products!</p>
  </footer>
</div>
    );
}