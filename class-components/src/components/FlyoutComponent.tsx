import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearList, selectItemsArr } from '../slices/selectedItemsSlice';
import downloadCSV from '../service/downloadCSV';
import { selectType } from '../slices/headerSlice';
import '../App.css';

function FLyout(): ReactNode {
  const dispatch = useDispatch();
  const selectedArr = useSelector(selectItemsArr);
  const type = useSelector(selectType);

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
          onClick={() => downloadCSV(selectedArr, type)}
        >
          Download
        </button>
        <button
          className="flyout-btn"
          type="button"
          onClick={() => dispatch(clearList())}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FLyout;
