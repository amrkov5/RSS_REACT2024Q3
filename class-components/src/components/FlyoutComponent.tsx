'use client';

import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { clearList, selectItemsArr } from '../slices/selectedItemsSlice';
import downloadCSV from '../service/downloadCSV';

function FLyout(): ReactNode {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedArr = useSelector(selectItemsArr);
  const { type } = router.query;

  return (
    <div className="flyout-wrapper" data-testid="flyout">
      <p>
        You have selected {selectedArr.length} card
        {selectedArr.length > 1 ? 's' : ''}
      </p>
      <div>
        <button
          className="flyout-btn"
          type="button"
          onClick={() => downloadCSV(selectedArr, type as string)}
        >
          Download
        </button>
        <button
          className="flyout-btn"
          type="button"
          onClick={() => dispatch(clearList())}
        >
          Unselect All
        </button>
      </div>
    </div>
  );
}

export default FLyout;
