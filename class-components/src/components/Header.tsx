import { ReactNode, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResourceSelector from './ResourceSelector';
import InputBlock from './InputBlock';
import { ThemeContext } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import {
  selectWholeAppError,
  toggleAppError,
  toggleFetchError,
} from '../slices/errorSlice';

function Header(): ReactNode {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const appError = useSelector(selectWholeAppError);

  if (appError) {
    throw new Error('Whole app error');
  }

  return (
    <header className="header" data-testid="header" data-theme={theme?.theme}>
      <a
        className="header-link"
        href="https://swapi.dev/"
        target="_blank"
        rel="noreferrer"
      >
        STAR WARS API
      </a>
      <div className="err-wrapper">
        <button
          className="err-btn"
          onClick={() => dispatch(toggleFetchError())}
          type="button"
        >
          Fetch Error
        </button>
        <button
          className="err-btn"
          onClick={() => dispatch(toggleAppError())}
          type="button"
        >
          App Error
        </button>
      </div>
      <div className="search-wrapper">
        <ResourceSelector />
        <InputBlock />
      </div>
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
