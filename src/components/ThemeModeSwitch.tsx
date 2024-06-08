import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface ThemeModeSwitchProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function ThemeModeSwitch(props: ThemeModeSwitchProps) {

  const checkedStyle = props.darkMode ? 'bg-sky-700' : '';
  const handleSwitch = () => {
    props.setDarkMode(!props.darkMode);
  }
  return (
    <label className="relative inline-block">
      <input checked={props.darkMode} type="checkbox" className="peer invisible" onClick={() => handleSwitch()}/>
      <span
        className={`p-2 absolute top-0 left-0 w-20 h-10 cursor-pointer rounded-full bg-slate-200 duration-300 border border-slate-300 transition-all ${props.darkMode ? 'bg-sky-700 opacity-50' : 'bg-yellow-200 opacity-50'}`}
      />
      <span
        className={`flex justify-center items-center absolute top-0.5 left-0.5 w-9 h-9 bg-white rounded-full z-10 transition-all duration-300 peer-checked:translate-x-10 ${props.darkMode ? 'bg-sky-700' : 'bg-yellow-300'} `}>
        {props.darkMode ?
          <DarkModeIcon sx={{fill: 'currentColor', color: 'white', width: 1, cursor: 'pointer'}}/> :
          <WbSunnyIcon sx={{fill: 'currentColor', color: 'white', width: 1, cursor: 'pointer'}}/>
        }
      </span>
    </label>
  )
}