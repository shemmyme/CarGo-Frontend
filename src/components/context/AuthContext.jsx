import jwt_decode from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const access_token = localStorage.getItem("authToken");

    console.log(authToken);
    if (authToken) {
      const decoded_token = jwt_decode(authToken);
      const {
        name,
        username,
        user_id,
        email,
        is_active,
        is_admin,
        department,
        is_blocked,
        designation,
        seating_location,
      } = decoded_token;
      const user = {
        name: name,
        email: email,
        department: department,
        is_admin: is_admin,
        is_active: is_active,
        user_id: user_id,
        is_blocked: is_blocked,
        designation: designation,
        seating_location: seating_location,
        username: username,
      };
      console.log(user);
      setUser(decoded_token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;