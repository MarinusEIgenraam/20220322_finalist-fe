///////////////////////
//// Build
import React, { createContext, useState } from "react";


///////////////////////
//// Environmental

///////////////////////
//// External

export const UtilityContext = createContext();


export default function UtilityProvider({ children }) {
    const [ theme, setTheme ] = useState("light");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ hasError, setHasError ] = useState(false)


    return (
        <UtilityContext.Provider
            value={ {
                hasError,
                setHasError,
                theme,
                isLoading,
                setIsLoading,
            } }>
            { children }
        </UtilityContext.Provider>
    );
};


