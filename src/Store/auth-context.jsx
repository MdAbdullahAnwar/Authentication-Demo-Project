import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const currentTime = new Date().getTime();
    const remainingTime = storedExpirationTime - currentTime;

    if (remainingTime <= 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null;
    }

    return {
      token: storedToken,
      duration: remainingTime,
    };
  };

  const tokenData = retrieveStoredToken();
  const [token, setToken] = useState(tokenData ? tokenData.token : null);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  };

  const loginHandler = (token) => {
    setToken(token);
    const expirationTime = new Date().getTime() + 5 * 60 * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
  };

  useEffect(() => {
    if (tokenData) {
      const logoutTimer = setTimeout(() => {
        logoutHandler();
        alert('You have been logged out due to inactivity.');
      }, tokenData.duration);

      return () => clearTimeout(logoutTimer);
    }
  }, [tokenData]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
