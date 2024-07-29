import { ReactNode, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ButtonBlockProps } from '../types';
import { ThemeContext } from './ThemeContext';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';

function ButtonsBlock({ next }: ButtonBlockProps): ReactNode {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const [page, setPage] = useState(router.query.page || 1);
  const dispatch = useDispatch();

  const handleNext = (): void => {
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    const curPage = Number(page) + 1;
    setPage(Number(page) + 1);
    const newQuery = { ...router.query, page: curPage };
    router.push({ query: newQuery });
  };

  const handlePrev = (): void => {
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    const curPage = Number(page) - 1;
    setPage(curPage);
    const newQuery = { ...router.query, page: curPage };
    router.push({ query: newQuery });
  };
  return (
    <div className="buttons-block">
      <button
        type="button"
        disabled={page === '1'}
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
