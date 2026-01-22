import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function Home(){
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
    {/* search bar */}
    const [searching,setsearching]=useState("");
    const filtredproducts = products.filter((pro)=>
                                pro.title.toLowerCase().includes(searching.toLowerCase()));
    console.log(filtredproducts);
    
    return(
        <div className="container my-4">
    {/* Navigation Bar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-4 rounded">
    <div className="container-fluid">
        <h1 className="navbar-brand fs-2 m-0">
            MiniStore
        </h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/card">Card</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>


    {/* Main Content */}
    <div>
        <h1 className="mb-4 text-center">MiniStore</h1>
        {loading && <p className="text-center">Loading content ...</p>}
         <input 
         type="text" 
         placeholder="Search"
         className="form-control form-control-lg mb-3"
         value={searching}
         onChange={(s)=>setsearching(s.target.value)}
         />   
        <div className="row">
            {filtredproducts.map((pro, index) => (
                <div key={index} className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img src={pro.images[0]} className="card-img-top" alt={pro.title} />
                        <div className="card-body text-center">
                            <h5 className="card-title">{pro.title}</h5>
                            <p className="card-text">${pro.price}</p>
                            <button className="btn btn-secondary">Add to card</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    {/* Footer */}
    <footer className="bg-secondary text-white py-4 mt-5">
    <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} MiniStore. All rights reserved.</p>
        <p className="mb-1">Your one-stop shop for the coolest products!</p>
    </div>
</footer>
</div>

    );
}