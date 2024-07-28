import { ReactNode, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeSwitcher(): ReactNode {
  const theme = useContext(ThemeContext);

  const switchTheme = () => {
    if (theme?.theme === 'light') {
      theme?.setTheme('dark');
    } else {
      theme?.setTheme('light');
    }
  };
  return (
    <div className="container">
      <label htmlFor="slider" id="switch" className="switch">
        <input type="checkbox" onChange={switchTheme} id="slider" />
        <span className="slider round" />
      </label>
    </div>
  );
}
