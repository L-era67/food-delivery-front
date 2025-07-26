"use client";

import { userDetailType } from "@/lib/types/Types-Categories-Food";
import { createContext, useContext, useEffect, useState } from "react";

type userType = {
  userId: string;
  role: string;
  email: string;
};

type userSetType = {
  user:userDetailType,
}

export const userContext = createContext({} as userSetType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({} as userDetailType);

  const getCurrentUserByAccessToken = async (accessToken: string) => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/get-current-user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ) ;
      // console.log("response:", response);
      const data = await response.json();

      console.log("data user", data.user);
      // setUser(response)

        setUser(data?.user)
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    // const accessToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMzNzQzNDcsInVzZXJEYXRhIjp7InVzZXJJZCI6IjY4ODFkMDdmYmU3MzE4MDJlNDIzZjUzYyIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20ifSwiaWF0IjoxNzUzMzcwNzQ3fQ.4B7xZb_tMsfCFALARpBjtDDDsW4K6mc3e9hyYdHFtNA";
    const accessToken = localStorage.getItem("token") as string;
    console.log("accessToken:", accessToken);

    const getCurrentUser = async () => {
      await getCurrentUserByAccessToken(accessToken);
    };

    getCurrentUser();
  }, []);

  return (
    <userContext.Provider
      value={{ user }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUser = () =>useContext(userContext);