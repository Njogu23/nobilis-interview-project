import React, { useContext } from 'react';
import SignInToggle from "./components/SignInToggle/SignInToggle";
import Navbar from "./components/Navbar/Navbar";
import { MyContext } from './MyContext';

function App() {
  const { user } = useContext(MyContext);

  if (!user) {
    return <SignInToggle />;
  }

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;