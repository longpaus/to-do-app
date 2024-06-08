import {useState} from "react";

interface ThemeModeSwitchProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function ThemeModeSwitch(props: ThemeModeSwitchProps) {
  const [darkMode, setDarkMode] = useState(props.darkMode);

  const handleSwitch = () => {
    setDarkMode(!darkMode);
    props.setDarkMode(darkMode);
  }
  return (
    <label className="relative inline-block">
      <input type="checkbox" className="peer invisible" onClick={() => handleSwitch()}/>
      <span
        className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
    </label>
  )
}