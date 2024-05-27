import React, { useContext } from 'react';
import SignInToggle from "./components/SignInToggle/SignInToggle";
import Navbar from "./components/Navbar/Navbar";
import { MyContext } from './MyContext';
import ApiData from './components/ApiData/ApiData';

function App() {
  const { user } = useContext(MyContext);

  if (!user) {
    return <SignInToggle />;
  }

  return (
    <div>
      <Navbar />
      <ApiData />
    </div>
  );
}

export default App;