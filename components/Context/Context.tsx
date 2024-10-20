import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the interface for your context
interface ThemeContextType {
    theme: string;
    toggleTheme: (newTheme: string) => void;
}

// Create the context with undefined as the initial value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

// Provide the ThemeContext to components
export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Define toggleTheme function that switches themes
    const toggleTheme = (newTheme: string) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext, with added error handling
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
