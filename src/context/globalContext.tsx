import { createContext } from "react";
import type { User } from "../types/User";

export const GlobalContext = createContext<{
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}>({
    user: undefined,
    setUser: () => { }
});

import { useContext } from "react";

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};