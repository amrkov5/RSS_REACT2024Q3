import { ReactNode, useEffect, useState } from 'react';
import { SelectorAndInputProps } from '../types';
import useDataFromLS from '../hooks/useDataFromLS';

function InputBlock(props: SelectorAndInputProps): ReactNode {
  const { onChange } = props;
  const [textToLS, setTextToLS] = useDataFromLS('search');
  const [text, setText] = useState(textToLS);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextToLS(text);
  };

  useEffect(() => {
    onChange(textToLS);
  }, [textToLS]);

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitForm(e)}>
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
