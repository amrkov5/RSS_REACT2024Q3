import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function useDataFromLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const searchParams = useSearchParams();
  const pathParams = usePathname().split('/')[1];
  const search = searchParams.get('search');
  const [text, setText] = useState(() => {
    let returnedValue;
    let typePath;
    const typeArr = ['people', 'films', 'vehicles', 'species', 'starships'];
    if (!typeArr.find((el) => el === pathParams)) {
      typePath = undefined;
    } else {
      typePath = pathParams;
    }
    if (typeof window === 'undefined') {
      returnedValue = key === 'type' ? typePath || 'people' : search || '';
    } else {
      returnedValue =
        key === 'type'
          ? typePath || window.localStorage.getItem(key) || 'people'
          : search || window.localStorage.getItem(key) || '';
    }
    return returnedValue;
  });
  useEffect(() => {
    localStorage.setItem(key, text);
  }, [key, text]);

  return [text, setText];
}

export default useDataFromLS;
