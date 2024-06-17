import React, {useEffect, useState} from 'react';
import {getSystemTheme} from "./utils/uiFunctions";
import Router from "./Router";
import {RouterProvider} from "react-router-dom";
import ThemeModeSwitch from "./components/ThemeModeSwitch";

function App() {
    const [darkMode, setDarkMode] = useState(() => getSystemTheme());

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className="dark:bg-darkBackground bg-lightBackground overflow-x-hidden ">
            <div className="absolute right-24 top-3">
                <ThemeModeSwitch darkMode={darkMode} setDarkMode={setDarkMode}/>
            </div>
            <RouterProvider router={Router}/>
        </div>
    );
}

export default App;
