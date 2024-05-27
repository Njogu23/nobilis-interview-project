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
      <p>Welcome {user.username}!</p>
      <button className="btn-nav" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar;
