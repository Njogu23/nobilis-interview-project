import React from 'react'

function Navbar({onLogout}) {

  function handleLogout() {
    const token = localStorage.getItem('authToken');

    if (token) {
        console.log(token);
        console.log(token === true);
      }

    fetch("/logout", {
      method: "DELETE",
    }).then(()=>{
        localStorage.removeItem('authToken')
        onLogout()
    })
  }

  
  return (
    <div className="nav">
      <div>
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
         onMouseOver={(e)=> e.target.style.background = "#D3D3D3"} 
         onMouseOut={(e)=> e.target.style.background = "gray" } onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar