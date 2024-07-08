import { useEffect, useState } from 'react';

function useDataFromLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [text, setText] = useState(() => {
    const typeFromLS = localStorage.getItem(key);
    if (key === 'type') {
      return typeFromLS || 'people';
    }
    return typeFromLS || ' ';
  });
  useEffect(() => {
    localStorage.setItem(key, text);
  }, [key, text]);

  return [text, setText];
}

export default useDataFromLS;
