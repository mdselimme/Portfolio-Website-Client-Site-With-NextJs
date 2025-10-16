"use client";
import { IUser } from "@/types/user.type";
import { getUserData } from "@/utils/getUsersData";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface IUserContext {
  user?: IUser;
  setUser: (user?: IUser) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({
  children,
  serverUser,
}: {
  children: ReactNode;
  serverUser?: IUser;
}) => {
  const [user, setUser] = useState<IUser | undefined>(serverUser);

  // Hydrate user on client side if not yet available
  useEffect(() => {
    if (!user) {
      (async () => {
        const res = await getUserData();
        if (res) setUser(res);
      })();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
