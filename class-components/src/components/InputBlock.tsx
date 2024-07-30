import { ReactNode, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeContext } from './ThemeContext';
import { clearList } from '../slices/selectedItemsSlice';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';
import useDataFromLS from '../hooks/useDataFromLS';

function InputBlock(): ReactNode {
  const dispatch = useDispatch();
  const router = useRouter();
  const [textFromLS, setTypeFromLS] = useDataFromLS('search');
  const [text, setText] = useState(textFromLS || '');
  const theme = useContext(ThemeContext);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    dispatch(clearList());
    setTypeFromLS(text);
    const newQuery = { ...router.query, search: text };
    router.push({ query: newQuery });
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitForm(e)}
      data-testid="search-form"
    >
      <input
        className="search-input"
        type="text"
        value={router.query.search || textFromLS || ''}
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
