import React from "react";
import { useStorageState } from "./useStorageState";

interface AuthContextType {
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch("http://192.168.0.105:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.log("response", response);
        throw new Error("Authentication failed");
      }

      const { webToken } = await response.json();
      setSession(webToken);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
      const response = await fetch(
        "http://192.168.0.105:4000/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const { webToken } = await response.json();
      setSession(webToken);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
