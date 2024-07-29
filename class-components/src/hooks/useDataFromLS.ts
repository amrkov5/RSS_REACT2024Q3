import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function useDataFromLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const { resourceType } = useParams();
  const [text, setText] = useState(() => {
    if (key === 'type') {
      if (resourceType) {
        return resourceType;
      }
      return 'people';
    }
    return '';
  });
  useEffect(() => {
    localStorage.setItem(key, text);
  }, [key, text]);

  return [text, setText];
}

export default useDataFromLS;
