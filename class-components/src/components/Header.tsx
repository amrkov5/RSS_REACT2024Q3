import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutProps } from '../types';
import ResourceSelector from './ResourceSelector';
import InputBlock from './InputBlock';

function Header(props: LayoutProps): ReactNode {
  const {
    throwFetchError,
    wholeAppError,
    updateText,
    updateType,
    setLink,
    setPage,
  } = props;
  const [text, setText] = useState<string>('');
  const [type, setType] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (type) {
      const typeNav = searchParams.get('search')
        ? `/RSS_REACT2024Q3/${type}?${searchParams}`
        : `/RSS_REACT2024Q3/${type}`;
      navigate(typeNav, { replace: true });

      setLink('');
      setPage(1);
      updateType(type);
    }
  }, [type, updateType, searchParams]);

  useEffect(() => {
    if (text) {
      setSearchParams({ search: text }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }

    setLink('');
    setPage(1);
    updateText(text);
  }, [text, updateText]);

  return (
    <header className="header">
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
        <ResourceSelector onChange={setType} />
        <InputBlock onChange={setText} />
      </div>
    </header>
  );
}

export default Header;
