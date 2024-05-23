import { useEffect, useState } from "react";
import SignInToggle from "./components/SignInToggle/SignInToggle";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch("http://localhost:3000/login", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((u) => setUser(u.status.data.user))
      .catch((error) => console.error(error));
    }
  }, []);

  const handleLogin = (user, token) => {
    localStorage.setItem('authToken', token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (!user) {
    return <SignInToggle onLogin={handleLogin} />;
  }

  return (
    <div>
      Welcome {`${user.username}`}
      <Navbar onLogout={handleLogout} />
    </div>
  );
}

export default App;
