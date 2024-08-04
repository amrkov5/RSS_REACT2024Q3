import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function useDataFromLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const search = searchParams.get('search');
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
