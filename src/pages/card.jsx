import { useNavigate } from 'react-router-dom';
import './style/card.css';

export function Card({ cart, setcard }) {

  const nav = useNavigate();
  /* delete a product from card */
  const deleteCartProduct = (index) => {
    setcard(prev => prev.filter((_, i) => i !== index));
  };
  /* add & reduce quantity */
const addQuantity = (pro) => {
  if (pro.quantity < 10) {
    setcard(prev =>
      prev.map(item =>
        item.id === pro.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }
};
const reduceQuantity = (pro) => {
  if (pro.quantity > 1) {
    setcard(prev =>
      prev.map(item =>
        item.id === pro.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
};

  
  return (
    <div id="card-container">
  <h1 id="card-title">Your Cart</h1>

  {cart.length === 0 && <p id="empty-cart">Cart is empty</p>}

  {cart.map((ca, index) => (
    <div id="card-item" key={index}>

      <img src={ca.image} alt="product" id="card-image" />

      <div id="card-info">
        <p id="card-name">{ca.title}</p>
        <p id="card-price">${ca.price}</p>

        <div id="quantity-box">
          <button onClick={() => reduceQuantity(ca)}>-</button>
          <span>{ca.quantity}</span>
          <button onClick={() => addQuantity(ca)}>+</button>
        </div>
      </div>

      <button id="remove-btn" onClick={() => deleteCartProduct(index)}>
        ✕
      </button>

    </div>
  ))}

  <button id="return-btn" onClick={() => nav("/home")}>
    Return Home
  </button>
</div>

  );
}
