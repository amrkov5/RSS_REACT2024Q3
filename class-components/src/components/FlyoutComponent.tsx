'use client';

import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { clearList, selectItemsArr } from '../slices/selectedItemsSlice';
import downloadCSV from '../service/downloadCSV';

function FLyout(): ReactNode {
  const dispatch = useDispatch();
  const selectedArr = useSelector(selectItemsArr);
  const pathParams = usePathname();

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
          onClick={() => downloadCSV(selectedArr, pathParams)}
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
