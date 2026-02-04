import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style/home.css'
export function Home({cart,setcard}){
    const nav = useNavigate();

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
    {/*add to card function*/}
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
  <h1 id="pro-title">MiniStore</h1>

  <input
    type="text"
    id="search"
    placeholder="Search"
    value={searching}
    onChange={(e) => setsearching(e.target.value)}
  />

  {loading && <p id="loading">Loading content...</p>}

  <div id="pros">
    {filtredproducts.map((pro,index) => (
      <div key={pro.id} id="pro-card" onClick={()=> nav("/product/"+pro.id)}>
        <img src={pro.images[0]} alt={pro.title} id="prod-img" />
        <h3 id="prod-title">{pro.title}</h3>
        <p id="prod-price">${pro.price}</p>
        <button id="add-btn" onClick={(e) => {e.stopPropagation();
           addtocart(pro);}}>
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