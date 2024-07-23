import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResourceSelector from './ResourceSelector';
import InputBlock from './InputBlock';
import {
  selectPageNum,
  selectSingleId,
  selectText,
  selectType,
} from '../slices/headerSlice';
import { ThemeContext } from './ThemeContext';
import '../index.css';
import ThemeSwitcher from './ThemeSwitcher';
import { toggleAppError, toggleFetchError } from '../slices/errorSlice';

function Header(): ReactNode {
  const dispatch = useDispatch();
  const typeFromStore = useSelector(selectType);
  const textFromStore = useSelector(selectText);
  const pageFromStore = useSelector(selectPageNum);
  const singleIdFromStore = useSelector(selectSingleId);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const pageNum = pageFromStore > 1 ? `page=${pageFromStore}` : '';
  const searchQuery = textFromStore ? `search=${textFromStore}` : '';
  const isQuerySymbolNeeded = pageFromStore || textFromStore ? '?' : '';
  const isAndSymbolNeeded = pageFromStore > 1 && textFromStore ? '&' : '';

  useEffect(() => {
    let typeNav = `./${typeFromStore}?${pageNum}`;
    if (singleIdFromStore) {
      typeNav = `./${typeFromStore}/card/${singleIdFromStore}`;
    } else {
      typeNav = `./${typeFromStore}${isQuerySymbolNeeded}${searchQuery}${isAndSymbolNeeded}${pageNum}`;
    }
    navigate(typeNav);
  }, [textFromStore, typeFromStore, pageFromStore, singleIdFromStore]);

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
