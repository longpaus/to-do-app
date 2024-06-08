import React, {useEffect, useState} from 'react';
import TaskController from "./components/TaskController";
import {getSystemTheme} from "./utils/uiFunctions";

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
      <TaskController/>

    </div>
  );
}

export default App;
