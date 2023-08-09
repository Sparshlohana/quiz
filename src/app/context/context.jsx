'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {

    const [dataList, setDataList] = useState([]);
    const [wrongCount, setWrongCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    return (
        <ThemeContext.Provider value={{ dataList, setDataList, wrongCount, setWrongCount, correctCount, setCorrectCount }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);