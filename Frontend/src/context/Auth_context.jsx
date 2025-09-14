// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  
  async function checkUser() {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/auth/check`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) setUser(data.user);
    else setUser(null);

    // console.log("\n\nAuth context data\n",data.user,"\n")
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
