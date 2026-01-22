import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function Home(){
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
    
    
    
    return(
        <div>
            <nav>
                <Link to="/profile">Profile</Link>
                <Link to="/card">Card</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <div>
                
                <h1>MiniStore</h1>
                {loading && <p>Loading content ...</p>}
                {products.map((pro)=>(
                <>
                    <h3>{pro.title}</h3>
                    <img src={pro.images[0]} alt="product picture" />    
                    <p>{pro.price}</p>
                </>
                )
                    
                )}
                


            </div>
        </div>
    );
}