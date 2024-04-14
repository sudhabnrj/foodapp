import { useState, createContext, useContext } from 'react';

const  ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        console.log(isDarkMode);
    }

    return(
        <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
            <div className={isDarkMode ? 'light' : 'dark'}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);