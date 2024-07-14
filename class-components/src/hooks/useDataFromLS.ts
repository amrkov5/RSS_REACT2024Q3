import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function useDataFromLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const { resourceType } = useParams();
  const [searchParams] = useSearchParams();
  const [text, setText] = useState(() => {
    const typeFromLS = localStorage.getItem(key);
    if (key === 'type') {
      if (resourceType) {
        return resourceType;
      }
      return typeFromLS || 'people';
    }
    return searchParams.get('search') || typeFromLS || '';
  });
  useEffect(() => {
    localStorage.setItem(key, text);
  }, [key, text]);

  return [text, setText];
}

export default useDataFromLS;
