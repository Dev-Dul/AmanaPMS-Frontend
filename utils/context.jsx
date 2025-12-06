import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { hydrateUser, LogOut } from "./fetch";
import { toast } from "sonner";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userLoad, setUserLoad] = useState(true); // true = loading

  /**
   * Runs the external hydration function and updates user state.
   */
  const hydrate = useCallback(async () => {
    setUserLoad(true);
    setError(null);

    try{
      const data = await hydrateUser();
      setUser(data.user);
    }catch(err){
      console.error("Auth hydration failed:", err);
      setUser(null);
      setError(err.message || "Failed to load user");
    }finally{
      setUserLoad(false);
    }
  }, []);

  /**
   * Re-run hydration when user has previously logged in.
   */
  useEffect(() => {
    const hasLogged = localStorage.getItem("logged") === "true";

    if(hasLogged){
      hydrate();
    }else{
      setUserLoad(false);
    }
  }, [hydrate]);

  /**
   * Simple reactive handlers for login/logout.
   * - handleLogin() should be called after successful login.
   * - handleLogout() should clear both local and context state.
   */
  const handleLogin = useCallback((userData) => {
    localStorage.setItem("logged", "true");
    setUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("logged");
    LogOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoad, error, hydrate, handleLogin, handleLogout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}


