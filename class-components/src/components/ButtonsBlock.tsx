import { ReactNode, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPageNum, updatePage } from '../slices/headerSlice';
import { ButtonBlockProps } from '../types';
import { ThemeContext } from './ThemeContext';

function ButtonsBlock({ next }: ButtonBlockProps): ReactNode {
  const pageNumFromStore = useSelector(selectPageNum);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const handleNext = (): void => {
    dispatch(updatePage({ page: pageNumFromStore + 1 }));
  };

  const handlePrev = (): void => {
    dispatch(updatePage({ page: pageNumFromStore - 1 }));
  };
  return (
    <div className="buttons-block">
      <button
        type="button"
        disabled={pageNumFromStore === 1}
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
