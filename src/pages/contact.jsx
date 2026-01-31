import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/contact.css'
export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submit,setsubmit]=useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmit(prev=>[...prev,formData]);
  };

  return (<div id="contact-container">
  <h2 id="contact-title">Contact Us</h2>

  <form id="contact-form" onSubmit={handleSubmit}>

    <div id="form-group">
      <label htmlFor="name" id="form-label">Name</label>
      <input
        type="text"
        id="form-input"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    <div id="form-group">
      <label htmlFor="email" id="form-label">Email</label>
      <input
        type="email"
        id="form-input"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    <div id="form-group">
      <label htmlFor="message" id="form-label">Message</label>
      <textarea
        id="form-textarea"
        name="message"
        rows="4"
        placeholder="Write your message here..."
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
    </div>

    <button type="submit" id="submit-btn">
      Send Message
    </button>

    <button
      type="button"
      id="back-btn"
      onClick={() => navigate("/home")}
    >
      ← Back to Home
    </button>

    {submit.map((s, index) => (
      <div id="submitted-item" key={index}>
        <h3>{s.name}</h3>
        <h3>{s.email}</h3>
        <h4>{s.message}</h4>
      </div>
    ))}

  </form>
</div>

  );
}
