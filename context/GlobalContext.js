// context/GlobalContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    return (
        <GlobalContext.Provider value={{ isLoading, setIsLoading, user, setUser, selectedDoctor, setSelectedDoctor }}>
            {children}
        </GlobalContext.Provider>
    );
};
