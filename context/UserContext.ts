import { createContext, Dispatch, SetStateAction } from "react";

type TUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

type TUserContext = {
    user: TUser | null;
    isLoading: boolean;
    setUser: Dispatch<SetStateAction<TUser | null>>;
}

export const UserContext = createContext<TUserContext | null>(null)