import React, { useState } from "react";
import { useStorageState } from "./useStorageState";
import { Alert } from "react-native";

interface AuthContextType {
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userID: string | null;
}

const AuthContext = React.createContext<AuthContextType>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
  userID: null,
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
  const [userID, setUserID] = useState<string | null>(null);

  const signIn = async (username: string, password: string) => {
    if (!username || !password) {
      Alert.alert("Please enter username and password");
      return;
    }
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
        Alert.alert(response.statusText);
        throw new Error("Authentication failed");
      }

      const { webToken, userID } = await response.json();
      console.log("webToken", webToken);
      console.log("userID", userID);
      setSession(webToken);
      setUserID(userID);
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

      const { webToken, userID } = await response.json();
      setSession(webToken);
      setUserID(userID);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  const signOut = () => {
    setSession(null);
    setUserID(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
        userID,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
