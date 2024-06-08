import React, {useEffect, useState} from 'react';
import TaskController from "./components/TaskController";
import {getSystemTheme} from "./utils/uiFunctions";

function App() {
  const [darkMode, setDarkMode] = useState(() => getSystemTheme());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="bg-background overflow-x-hidden ">
      <TaskController/>

    </div>
  );
}

export default App;
