import { useState } from "react";
import type { User } from "../types/User";
import { GlobalContext } from "./globalContext";

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | undefined>(undefined);
    return (
        <GlobalContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </GlobalContext.Provider>
    );
}