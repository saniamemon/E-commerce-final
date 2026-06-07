import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // 🔥 LOAD USER ON PAGE REFRESH
  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parsed = JSON.parse(data);
      setAuth({
        user: parsed.user,
        token: parsed.token,
      });
    }
  }, []);

  // 🔥 LOGIN FUNCTION
  const login = (user, token) => {
    const data = { user, token };

    localStorage.setItem("auth", JSON.stringify(data));

    setAuth({
      user,
      token,
    });
  };

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("auth");

    setAuth({
      user: null,
      token: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,

        // ✅ IMPORTANT FUNCTIONS
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;