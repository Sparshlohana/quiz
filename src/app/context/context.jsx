'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {

    const [dataList, setDataList] = useState([]);
    const [wrongCount, setWrongCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modeType, setModeType] = useState(null);
    const [numberOfQuestion, setNumberOfQuestion] = useState(null);
    const [loader, setLoader] = useState(false);


    return (
        <ThemeContext.Provider value={{ dataList, setDataList, wrongCount, setWrongCount, correctCount, setCorrectCount, selectedCategory, setSelectedCategory, modeType, setModeType, numberOfQuestion, setNumberOfQuestion, loader, setLoader }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);