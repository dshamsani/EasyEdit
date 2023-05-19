import { FC, createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthProvider } from "./interfaces";

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeLocalStoreToken: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  useEffect(() => {
    window.addEventListener("storage", () => {
      const token = localStorage.getItem("token");
      setAuthenticated(!!token);
    });
  }, []);

  const changeLocalStoreToken = (type: "delete" | "update", value?: string) => {
    if (type === "update" && value) {
      localStorage.setItem("token", value);
      window.dispatchEvent(new Event("storage"));
    }
    if (type === "delete") {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage"));
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, changeLocalStoreToken }}>{children}</AuthContext.Provider>;
};
