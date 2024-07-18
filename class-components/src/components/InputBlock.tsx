import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDataFromLS from '../hooks/useDataFromLS';
import { updatePage, updateText } from '../slices/headerSlice';

function InputBlock(): ReactNode {
  const dispatch = useDispatch();
  const [textToLS, setTextToLS] = useDataFromLS('text');
  const [text, setText] = useState(textToLS);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextToLS(text);
    dispatch(updateText({ text }));
    dispatch(updatePage({ page: 1 }));
  };

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitForm(e)}>
      <input
        className="search-input"
        type="text"
        value={text || ''}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default InputBlock;
