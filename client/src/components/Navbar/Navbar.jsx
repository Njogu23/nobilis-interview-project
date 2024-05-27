import React, { useContext } from 'react';
import "./navbar.css";
import { MyContext } from '../../MyContext';

function Navbar() {
  const { user, logout } = useContext(MyContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      logout();
    });
  }

  return (
    <div className="nav">
      <p>Welcome {`${user.username}`}</p>
      <button id="btn-nav" 
        style={{
          fontSize:"15px",
          background:"gray",
          color:"white",
          padding:"15px",
          cursor:"pointer",
          margin:"2px",
          border:"none"    
        }} 
        onMouseOver={(e) => e.target.style.background = "#D3D3D3"} 
        onMouseOut={(e) => e.target.style.background = "gray"} 
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;