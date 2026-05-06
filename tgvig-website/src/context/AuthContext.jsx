import { createContext, useState } from "react";
import { authService } from "../auth/authService";

// ✅ EXPORT THIS
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());

  const login = (data) => {
    authService.setSession(data);
    setUser(data.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);