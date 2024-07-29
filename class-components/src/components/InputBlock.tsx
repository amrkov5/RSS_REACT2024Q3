import { ReactNode, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeContext } from './ThemeContext';
import { clearList } from '../slices/selectedItemsSlice';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';

function InputBlock(): ReactNode {
  const dispatch = useDispatch();
  const router = useRouter();
  const [text, setText] = useState(router.query.search || '');
  const theme = useContext(ThemeContext);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    dispatch(clearList());
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
        value={text || ''}
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
