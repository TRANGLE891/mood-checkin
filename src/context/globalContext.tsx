import { createContext } from "react";
import type { User } from "../types/User";

export const GlobalContext = createContext<{
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    moods: Record<string, Mood>;
    signout: () => void;
}>({
    user: undefined,
    setUser: () => { },
    moods: {},
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