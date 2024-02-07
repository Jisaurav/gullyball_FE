import React,{useState} from "react";
import {Link} from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">

    <Link className="navbar-brand" to="/">GullyBall</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNavbar}>
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Features</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">User Support</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  );
}
