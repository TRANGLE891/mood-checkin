import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/User";
import { GlobalContext } from "./globalContext";
import { getUserByUsername } from "../apis/users";
import type { Mood } from "../types/Mood";
import { getMoods } from "../apis/moods";
import type { UserMood } from "../types/UserMood";

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const savedUserName = localStorage.getItem('username');
    const [user, setUser] = useState<User | undefined>();
    const [moods, setMoods] = useState<Record<string, Mood>>({});
    const [userMood, setUserMood] = useState<UserMood>();

    const signout = useCallback(() => {
        localStorage.removeItem('username');
        setUser(undefined);
    }, [])

    // check if current user in local storage exist
    useEffect(() => {
        // Load moods
        getMoods().then(response => {
            const moodsData = response.data?.data;
            const moodsMap: Record<string, Mood> = {};
            moodsData.forEach((mood: Mood) => {
                moodsMap[mood.name.toLowerCase()] = mood;
            });
            setMoods(moodsMap);
        });

        if (savedUserName) {
            getUserByUsername(savedUserName).then(response => {
                const fetchedUser = response.data?.data;
                if (fetchedUser) {
                    setUser(fetchedUser);
                } else {
                    console.warn(`User with username ${savedUserName} not found. Clearing from local storage.`);
                    setUser(undefined);
                    localStorage.removeItem('username');
                }
            })
        }
    }, [savedUserName])

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            moods,
            userMood,
            setUserMood,
            signout
        }}>
            {children}
        </GlobalContext.Provider>
    );
}