"use client";
import { ReactNode, useEffect, useState } from "react"
import axios from "axios";
import { UserContext } from "./UserContext";

type TUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function UserContextProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios("/api/auth/me");        
        console.log("res?.data?.user in axios : ", res?.data?.user)
        
        setUser(res?.data?.user)
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isLoading: loading
      }}
    >{children}</UserContext.Provider>
  )
}
