import { createContext } from "react";
import type { User } from "../types/User";
import type { UserMood } from "../types/UserMood";

export const GlobalContext = createContext<{
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    moods: Record<string, Mood>;
    userMood?: UserMood;
    setUserMood: React.Dispatch<React.SetStateAction<UserMood | undefined>>;
    signout: () => void;
}>({
    user: undefined,
    setUser: () => { },
    moods: {},
    userMood: undefined,
    setUserMood: () => { },
    signout: () => { }
});

import { useContext } from "react";
import type { Mood } from "../types/Mood";

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};