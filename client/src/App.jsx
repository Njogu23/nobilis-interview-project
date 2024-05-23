import { useEffect, useState } from "react";
import SignInToggle from "./components/SignInToggle/SignInToggle";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/login")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((u) => setUser(u.status.data.user))
      .catch((error) => console.error(error));
  }, []);
  // console.log(user)

  if (!user) {
    return <SignInToggle onLogin={setUser} />;
  }

  return (
    <div>
      Hello world
      <Navbar onLogout={setUser}/>
    </div>
  )
}

export default App;
