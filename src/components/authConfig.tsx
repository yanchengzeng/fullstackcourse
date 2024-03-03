import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    console.log(`the lovely auth is ${JSON.stringify(auth)}`);
  
    if (!auth.token) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }
  
  function useAuth() {
    return React.useContext(AuthContext);
  }
  
  interface AuthContextType {
    token: any;
    signin: (token: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
  }
  
  let AuthContext = React.createContext<AuthContextType>(null!);
  
  function AuthProvider({ children }: { children: React.ReactNode }) {
    let [token, setToken] = useState(sessionStorage.getItem("jwt"))
  
    let signin = (newToken: string, callback: VoidFunction) => {
      setToken(newToken);
      callback();
    };
  
    let signout = (callback: VoidFunction) => {
      setToken('');
      callback();
    };
  
    let value = { token, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  export { AuthProvider, AuthContext, RequireAuth };