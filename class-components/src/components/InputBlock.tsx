'use client';

import { ReactNode, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from './ThemeContext';
import { clearList } from '../slices/selectedItemsSlice';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';
import useDataFromLS from '../hooks/useDataFromLS';

function InputBlock(): ReactNode {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathParams = usePathname();
  const router = useRouter();
  const [textFromLS, setTypeFromLS] = useDataFromLS('search');
  const [text, setText] = useState(
    searchParams.get('search') || textFromLS || ''
  );
  const theme = useContext(ThemeContext);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    dispatch(clearList());
    setTypeFromLS(text);
    const page = searchParams.get('page');
    const isSignNeeded = page || text ? '?' : '';
    const newQuery = `${pathParams}${isSignNeeded}${text ? `search=${text}` : ''}`;
    router.push(newQuery);
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitForm(e)}
      data-testid="search-form"
    >
      <input
        className="search-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="search-text"
      />

      <button type="submit" className="search-btn" data-theme={theme?.theme}>
        Search
      </button>
    </form>
  );
}

export default InputBlock;
