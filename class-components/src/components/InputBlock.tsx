import { ReactNode, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDataFromLS from '../hooks/useDataFromLS';
import { updatePage, updateText } from '../slices/headerSlice';
import { ThemeContext } from './ThemeContext';
import '../index.css';

function InputBlock(): ReactNode {
  const dispatch = useDispatch();
  const [textToLS, setTextToLS] = useDataFromLS('text');
  const [text, setText] = useState(textToLS);
  const theme = useContext(ThemeContext);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextToLS(text);
    dispatch(updateText({ text }));
    dispatch(updatePage({ page: 1 }));
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
