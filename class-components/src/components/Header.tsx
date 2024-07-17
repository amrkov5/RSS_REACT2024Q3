import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutProps } from '../types';
import ResourceSelector from './ResourceSelector';
import InputBlock from './InputBlock';
import {
  selectPageNum,
  selectSingleId,
  selectText,
  selectType,
} from '../slices/headerSlice';

function Header(props: LayoutProps): ReactNode {
  const { throwFetchError, wholeAppError } = props;
  const typeFromStore = useSelector(selectType);
  const textFromStore = useSelector(selectText);
  const pageFromStore = useSelector(selectPageNum);
  const singleIdFromStore = useSelector(selectSingleId);
  const navigate = useNavigate();

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
    <header className="header" data-testid="header">
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
          onClick={() => throwFetchError(true)}
          type="button"
        >
          Fetch Error
        </button>
        <button
          className="err-btn"
          onClick={() => wholeAppError(true)}
          type="button"
        >
          App Error
        </button>
      </div>
      <div className="search-wrapper">
        <ResourceSelector />
        <InputBlock />
      </div>
    </header>
  );
}

export default Header;
