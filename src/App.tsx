import React, {useEffect, useState} from 'react';
import TaskController from "./components/TaskController";
import {getSystemTheme} from "./utils/uiFunctions";
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
      <div className="absolute right-10 top-3">
        <ThemeModeSwitch darkMode={true} setDarkMode={setDarkMode}/>
      </div>
      <TaskController/>

    </div>
  );
}

export default App;
