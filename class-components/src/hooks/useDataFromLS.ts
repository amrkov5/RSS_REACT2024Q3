import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useDataFromLS(
  key: string
): [
  string | string[],
  React.Dispatch<React.SetStateAction<string | string[]>>,
] {
  const { type, search } = useRouter().query;
  const [text, setText] = useState(() => {
    let returnedValue;
    if (typeof window === 'undefined') {
      returnedValue = key === 'type' ? type || 'people' : search || '';
    } else {
      returnedValue =
        key === 'type'
          ? type || window.localStorage.getItem(key) || 'people'
          : search || window.localStorage.getItem(key) || '';
    }
    return returnedValue;
  });
  useEffect(() => {
    localStorage.setItem(key, text as string);
  }, [key, text]);

  return [text, setText];
}

export default useDataFromLS;
