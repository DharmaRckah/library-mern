import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    AccessToken: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.AccessToken;

  useEffect(() => {
    const data = sessionStorage.getItem("dauth");
  
  //  console.log(data,"this is auth data")
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        AccessToken: parseData.AccessToken,
      });
    }
  }, []);

  useEffect(() => {
    if (auth?.dtoken) {
      axios.defaults.headers.common["Authorization"] = auth.dtoken;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth?.dtoken]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
