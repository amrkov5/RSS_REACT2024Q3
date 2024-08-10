'use client';

import { ReactNode, useContext, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ButtonBlockProps } from '../types';
import { ThemeContext } from './ThemeContext';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';

function ButtonsBlock({ next }: ButtonBlockProps): ReactNode {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathParams = usePathname();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const dispatch = useDispatch();

  const handleNext = (): void => {
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    const curPage = Number(page) + 1;
    setPage(Number(page) + 1);
    const searchText = searchParams.get('search')
      ? `?search=${searchParams.get('search')}`
      : '';
    const newQuery = `${pathParams}${searchText}${searchText ? `&page=${curPage}` : `?page=${curPage}`}`;
    router.push(newQuery);
  };

  const handlePrev = (): void => {
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    const curPage = Number(page) - 1;
    const searchText = searchParams.get('search')
      ? `?search=${searchParams.get('search')}`
      : '';
    setPage(curPage);
    const newQuery = `${pathParams}${searchText}${searchText ? `&page=${curPage}` : `?page=${curPage}`}`;
    router.push(newQuery);
  };
  return (
    <div className="buttons-block" data-testid="buttons-block">
      <button
        type="button"
        disabled={page === 1}
        onClick={handlePrev}
        className="pagination-button"
        data-theme={theme?.theme}
      >
        Prev
      </button>
      <button
        type="button"
        disabled={!next}
        onClick={handleNext}
        className="pagination-button"
        data-theme={theme?.theme}
      >
        Next
      </button>
    </div>
  );
}

export default ButtonsBlock;
