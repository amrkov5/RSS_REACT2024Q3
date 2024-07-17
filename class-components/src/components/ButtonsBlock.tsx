import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPageNum, updatePage } from '../slices/headerSlice';
import { ButtonBlockProps } from '../types';

function ButtonsBlock({ next }: ButtonBlockProps): ReactNode {
  const pageNumFromStore = useSelector(selectPageNum);
  const dispatch = useDispatch();

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
      >
        Prev
      </button>
      <button
        type="button"
        disabled={!next}
        onClick={handleNext}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}

export default ButtonsBlock;
