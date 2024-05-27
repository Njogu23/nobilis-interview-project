import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const ContextProvider = ({ children }) => {
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

  const login = (user, token) => {
    localStorage.setItem('authToken', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider, MyContext };
