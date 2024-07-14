import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ButtonBlockProps } from '../types';

function ButtonsBlock(props: ButtonBlockProps): ReactNode {
  const { prev, next, setLink, setPage, page } = props;
  const [pageNum, setPageNum] = useState(page);
  const [searchParams] = useSearchParams();
  const { resourceType } = useParams();
  const navigate = useNavigate();

  const handleNext = (nextPage: number): void => {
    const navLink = `/RSS_REACT2024Q3/${resourceType}/page${pageNum}?search=${searchParams.get('search')}`;
    setPageNum(nextPage);
    setPage(nextPage);
    if (nextPage > 1) {
      setLink(next);
    }
    navigate(navLink, { replace: false });
  };

  const handlePrev = (prevPage: number): void => {
    setPageNum(prevPage);
    setPage(prevPage);
    setLink(prev);
    navigate(-1);
  };

  useEffect(() => {
    const navLink = `/RSS_REACT2024Q3/${resourceType}/page${pageNum}?search=${searchParams.get('search')}`;
    navigate(navLink, { replace: true });
  }, []);

  return (
    <div className="buttons-block">
      <button
        type="button"
        disabled={!prev}
        onClick={() => handlePrev(pageNum - 1)}
        className="pagination-button"
      >
        Prev
      </button>
      <button
        type="button"
        disabled={!next}
        onClick={() => handleNext(pageNum + 1)}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}

export default ButtonsBlock;
